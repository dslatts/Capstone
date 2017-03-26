const router = require('express').Router()
var db = require('../../db');
var User = db.models.user;
var Playlist = db.models.playlist;
var Song = db.models.song;
var Promise = require('bluebird');
const pRequest = require('request-promise');

router.get('/:playlistName', (req, res, next) => {
  if (!req.session.passport){
    const err = new Error('need to be logged in to use this function');
    err.status = 403;
    next(err);
  } else {
    // returns the result at the end of this promise chain. should be the created playlist object
    // with the name, spotify ID and the owner of this playlist
    return User.findOne({
      where: {
        name: req.session.passport.user
      }
    })
    .then(foundUser => {
      // api.setAccessToken('fill in token');
      // api.createPlaylist('username', {name: `${req.params.playlistName}`, public: false});
      return pRequest({
        url: `https://api.spotify.com/v1/users/${req.session.passport.user}/playlists`,
        method: 'POST',
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${foundUser.authToken}`
        },
        body: {
          name: req.params.playlistName,
          public: false
        }
      })
      .then(createdPlaylist => {
        return Playlist.findOrCreate({
          where: {
            title: req.params.playlistName,
            spotifyId: createdPlaylist.id
          }
        })
        .spread((playlist, wasCreatedBool) => {
          if (!wasCreatedBool){
            const err = new Error('playlist already exists. please use a different name');
            err.status = 400;
            next(err);
          }
          else {
            return playlist.setUser(foundUser)
            .then(() => {
              res.send(playlist);
            });
          }
        })
        .catch(next);
      });
    });
  }
});

router.post('/:playlistName/addSongs', (req, res, next) => {
  if (!req.session.passport){
    const err = new Error('need to be logged in to use this function');
    err.status = 403;
    next(err);
  } else {
    // returns the result at the end of this promise chain. should be the created playlist object
    // with the name, spotify ID and the owner of this playlist
    return User.findOne({
      where: {
        name: req.session.passport.user
      }
    })
    .then(foundUser => {
      // api.setAccessToken('fill in token');
      // api.createPlaylist('username', {name: `${req.params.playlistName}`, public: false});
      return pRequest({
        url: `https://api.spotify.com/v1/users/${req.session.passport.user}/playlists/${req.body.playlistId}/tracks`,
        method: 'POST',
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${foundUser.authToken}`
        },
        body: {
          tracks: req.body.tracks.map(trackId => 'spotify:track:' + trackId).join(','),
          public: false
        }
      })
      .then(snapshot => {console.log('this returns an id of the snapshot of the playlist. not sure what to do with id...');});
    })
    .catch(next);
  }
});

module.exports = router;
