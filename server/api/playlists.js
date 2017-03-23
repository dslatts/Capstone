const router = require('express').Router()
var db = require('../../db');
var User = db.models.user;
var Playlist = db.models.playlist;
var Song = db.models.song;
var Promise = require('bluebird');
const pRequest = require('request-promise');
var Spotify = require('spotify-web-api-js');
var api = new Spotify();

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
      console.log('issue placeholder 1');
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
        console.log('issue placeholder 2');
        console.log(createdPlaylist);
        return Playlist.findOrCreate({
          where: {
            title: req.params.playlistName,
            spotifyId: createdPlaylist.id
          }
        })
        .spread((playlist, wasCreatedBool) => {
          console.log('issue placeholder 3');
          console.log(playlist);
          if (!wasCreatedBool){
            const err = new Error('playlist already exists. please use a different name');
            err.status = 400;
            next(err);
          }
          else {
            // req.body.songs.forEach(song => song.setPlaylists(playlist));
            return playlist.setUser(foundUser);
          }
        })
        .then(() => {
          console.log('issue placeholder 3');
          res.send('playlist created');
        })
        .catch(next);
      });
    });
  }
});

// router.post('/:playlistName/addSongs', (req, res, next) => {
//
// });

module.exports = router;
