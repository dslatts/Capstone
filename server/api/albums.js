const router = require('express').Router()
var db = require('../../db');
var User = db.user;
var Playlist = db.playlist;
var Song = db.song;
const pRequest = require('request-promise');

// NOTE: the idea is that we need to search for artist, so it can be an english string.
// however, album can be obtained only by querying artist first and obtaining a list of albums.
// therefore, each album in the list will have its unique id, so the "album" param coming in here
// should already be in Spotify ID form, so we have no need to query for it.
router.get('/:album', (req, res, next) => {
  pRequest({
    url: 'https://api.spotify.com/v1/albums/' + req.params.album,
    method: 'GET',
    json: true
  })
  .then(foundTracks => {
    if (!foundTracks){
      const err = new Error('does not exist');
      err.status = 404;
      next(err);
    } else {
      res.send(foundTracks);
    }
  })
  .catch(next);
});

module.exports = router;
