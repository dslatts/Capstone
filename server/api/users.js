const router = require('express').Router();
const Promise = require('bluebird');
var db = require('../../db');
// var User = db.user;
// var Playlist = db.playlist;
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
    var artistlist = foundTopArtists.items.map(artistObj => {
      return Artist.findOrCreate({
        where: {
          name: artistObj.name
        }
      });
    });
    var songlist = foundTopSongs.items.map(songObj => {
      return Song.findOrCreate({
        where: {
          name: songObj.name
        }
      });
    });
    Promise.all([...artistlist, ...songlist])
    .then(arrayofitems => {
      const updatedArrOfItems = arrayofitems.map(item => {
        item[0].setUser(req.user);
      });
      return Promise.all(updatedArrOfItems);
    })
    .then(() => res.sendStatus(201))
    .catch(next);
  })
  .catch(next);
});

module.exports = router;
