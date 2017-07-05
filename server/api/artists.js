const router = require('express').Router();
var db = require('../../db');
var User = db.models.user;
const pRequest = require('request-promise');

router.get('/:artist/albums', (req, res, next) => {
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
        url: 'https://api.spotify.com/v1/search',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${foundUser.authToken}`
          },
        json: true,
        qs: {
          q: req.params.artist.split(' ').join('%20'),
          type: 'album'
        }
      })
      .then(albumsObj => {
        if (!albumsObj){
          const err = new Error('does not exist');
          err.status = 404;
          next(err);
        } else {
          res.json(albumsObj);
        }
      })
      .catch(next);
    });
  }
});

module.exports = router;
