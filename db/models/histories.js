const Sequelize = require('sequelize');
const db = require('../_db');

var History = db.define('history', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  danceability: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  energy: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  key: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  loudness: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  mode: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  speechiness: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  acousticness: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  instrumentalness: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  liveness: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  valence: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  tempo: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
});

module.exports = History;
