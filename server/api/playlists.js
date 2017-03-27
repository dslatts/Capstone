const router = require('express').Router()
var db = require('../../db');
var User = db.models.user;
var Playlist = db.models.playlist;
var Song = db.models.song;
var Promise = require('bluebird');
const pRequest = require('request-promise');

router.get('/', (req, res, next) => {
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
      return pRequest({
        url: `https://api.spotify.com/v1/me/playlists`,
        method: 'GET',
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${foundUser.authToken}`
        }
      })
      .then(userPlaylists => {
        var playlistlist = userPlaylists.items.map(playlistObj => {
          return Playlist.findOrCreate({
            where: {
              title: playlistObj.name,
              spotifyId: playlistObj.id
            }
          });
        });
        Promise.all(playlistlist)
        .then(arrofPlaylists => {
          const updatedArrofPlaylists = arrofPlaylists.map(item => {
            item[0].setUser(foundUser);
          });
          return Promise.all(updatedArrofPlaylists)
          .then(() => res.status(201).send(arrofPlaylists));
        })
        .catch(next);
      })
      .catch(next);
    })
    .catch(next);
  }
});

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
        url: `https://api.spotify.com/v1/users/${req.session.passport.user}/playlists/${req.body.playlistId}/tracks?position=0&uris=${req.body.uris.map(trackId => 'spotify%3Atrack%3A' + trackId).join(',')}`,
        method: 'POST',
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${foundUser.authToken}`
        },
        dataType: 'json'
      })
      .then(snapshot => res.send(snapshot));
    })
    .catch(err => console.log('===error message:', err));
  }
});

module.exports = router;
