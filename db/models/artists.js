const Sequelize = require('sequelize');
const db = require('../_db');

var Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Artist;
