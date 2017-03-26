const Sequelize = require('sequelize');
const db = require('../_db');

var Playlist = db.define('playlist', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Playlist;
