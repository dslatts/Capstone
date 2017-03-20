const router = require('express').Router()
var db = require('../../db');
var User = db.user;
var Playlist = db.playlist;
var Song = db.song;
const pRequest = require('request-promise');

router.get('/:playlistName', (req,res,next)=>{
  Playlist.findOrCreate({
    where: {
      title: req.params.playlistName
    }
  })
  .spread((playlist, wasCreatedBool) => {
    req.body.songs.forEach(song => song.setPlaylist(playlist))
  })
  .catch(next)
});

module.exports = router;
