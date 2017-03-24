const Sequelize = require('sequelize');
const db = require('../_db');
const User = db.models.user;

var AudioFeature = db.define('audiofeature', {
  label: {
    type: Sequelize.STRING
  },
  avg: {
    type: Sequelize.INTEGER
  }
}, {
  hooks: {
    // TODO not sure how to do this
    beforeValidate: function(audiofeature){
      User.findAll()
      .then(users => {
        return users.map(user => user.audioFeatures[audiofeature.id]).reduce((acc, val) => acc + val, 0) / users.length;});
    }
  }
});

module.exports = AudioFeature;
