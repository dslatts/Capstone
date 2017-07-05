const router = require('express').Router();
var db = require('../../db');
var User = db.models.user;
const pRequest = require('request-promise');

router.get('/:album', (req, res, next) => {
  if (!req.session.passport) {
    const err = new Error('need to be logged in to use this function');
    err.status = 403;
    next(err);
  }
  else {
    return User.findOne({
      where: {
        name: req.session.passport.user
      }
    })
    .then(foundUser => {
      return pRequest({
        url: 'https://api.spotify.com/v1/albums/' + req.params.album + '/tracks',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${foundUser.authToken}`
          },
        json: true
      });
    })
    .then(foundTracks => {
      if (!foundTracks){
        const err = new Error('does not exist');
        err.status = 404;
        next(err);
      } else {
        res.send(foundTracks);
      }
    })
    .catch(next);
  }
});

module.exports = router;
