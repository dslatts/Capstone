const router = require('express').Router()
var db = require('../../db');
var User = db.user;
var Playlist = db.playlist;
var Song = db.song;
var Promise = require('bluebird');
const pRequest = require('request-promise');
var Spotify = require('spotify-web-api-js');
var api = new Spotify();

router.post('/:playlistName', (req, res, next) => {
  console.log('hello world');
  if (!req.user){
    const err = new Error('need to be logged in to use this function');
    err.status = 403;
    next(err);
  } else {
    Playlist.findOrCreate({
      where: {
        title: req.params.playlistName
      }
    })
    .spread((playlist, wasCreatedBool) => {
      if (!wasCreatedBool){
        const err = new Error('playlist already exists. please use a different name')
        err.status = 400;
        next(err);
      } else {
        // TODO on front end, be sure to attach songs in the desired playlist
        // to the request body under array called 'songs'
        req.body.songs.forEach(song => song.setPlaylist(playlist));
        api.setAccessToken('fill in token');
        api.createPlaylist('username', {name: `${req.params.playlistName}`, public: false});
      }
    })
    .catch(next);
  }
});

module.exports = router;
