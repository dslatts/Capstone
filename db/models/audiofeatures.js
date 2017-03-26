const Sequelize = require('sequelize');
const db = require('../_db');
const User = db.models.user;

var AudioFeature = db.define('audiofeature', {
  label: {
    type: Sequelize.STRING
  }
});

module.exports = AudioFeature;
