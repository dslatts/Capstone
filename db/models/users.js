const Sequelize = require('sequelize');
const db = require('../_db');

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User;
