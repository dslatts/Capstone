const router = require('express').Router()
const Promise = require('bluebird');
var db = require('../../db');
var User = db.user;
var Playlist = db.playlist;
var Song = db.song;
const pRequest = require('request-promise');

//
router.post('/:artistName', (req, res, next) => {
  // var Artist = pRequest('https://api.spotify.com/v1/search?q=', (err, res, body) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //
  //   }
  // })
})

module.exports = router;
