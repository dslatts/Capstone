const Sequelize = require('sequelize');
const db = require('../_db');

var Playlist = db.define('playlist', {
  title: {
    type: Sequelize.STRING
  },
  spotifyId: {
    type: Sequelize.STRING
  }
});

module.exports = Playlist;
