const Sequelize = require('sequelize');
const db = require('../_db');

var User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  spotifyId: {
    type: Sequelize.STRING
  },
  authToken: {
    type: Sequelize.TEXT
  }
});

module.exports = User;
