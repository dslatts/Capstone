const Sequelize = require('sequelize');
const db = require('../_db');

var Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING
  },
  spotifyId: {
    type: Sequelize.STRING
  }
});

module.exports = Artist;
