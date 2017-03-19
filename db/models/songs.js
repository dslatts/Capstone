const Sequelize = require('sequelize');
const db = require('../_db');

var Song = db.define('song', {
  title: {
    type: Sequelize.STRING
  },
  spotifyId: {
    type: Sequelize.STRING
  }
})

module.exports = Song;
