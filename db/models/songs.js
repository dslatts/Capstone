const Sequelize = require('sequelize');
const db = require('../_db');

var Song = db.define('song', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Song;
