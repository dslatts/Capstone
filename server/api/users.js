const router = require('express').Router()
const Promise = require('bluebird');
var db = require('../../db');
var User = db.user;
var Playlist = db.playlist;
var Song = db.song;
var Artist = db.artist;
const pRequest = require('request-promise');

//
router.post('/:artistName', (req, res, next) => {
  let topArtists = pRequest({
    url: `https://api.spotify.com/v1/me/top/artists/`,
    method: 'GET',
    json: true,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${req.token}`
    }
  });
  let topSongs = pRequest({
    url: `https://api.spotify.com/v1/me/top/tracks`,
    method: 'GET',
    json: true,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${req.token}`
    }
  });
  Promise.all([topArtists, topSongs])
  .spread((foundTopArtists, foundTopSongs) => {
    //TODO need to finish creating artists
    foundTopArtists.map()
    Artist.findOrCreate({
      where: {
        name: foundTopArtists.items.name
      }
    })
  })
});

module.exports = router;
