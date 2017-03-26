const router = require('express').Router();
const pRequest = require('request-promise');
var db = require('../../db');
var User = db.models.user;

router.get('/audio-features', (req, res, next) => {
	// TODO: Change authorization token from a temporary one to permanent
	if (!req.session.passport){
    const err = new Error('need to be logged in to use this function');
    err.status = 403;
    next(err);
  } else {
    // returns the result at the end of this promise chain. should be the created playlist object
    // with the name, spotify ID and the owner of this playlist
    return User.findOne({
      where: {
        name: req.session.passport.user
      }
    })
    .then(foundUser => {
			return pRequest({
				url: 'https://api.spotify.com/v1/audio-features?ids=' + req.query.ids,
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${foundUser.authToken}`
				}
			})
			.then(foundAudioFeatures => {
				if (!foundAudioFeatures) {
					const err = new Error('no found tracks');
					err.status = 404;
					next(err);
				} else {
				res.send(foundAudioFeatures);
			}
		});
		})
		.catch(next);
	}
});

router.get('/recentSongs', (req, res, next) => {
	if (!req.session.passport){
    const err = new Error('need to be logged in to use this function');
    err.status = 403;
    next(err);
  } else {
    // returns the result at the end of this promise chain. should be the created playlist object
    // with the name, spotify ID and the owner of this playlist
    return User.findOne({
      where: {
        name: req.session.passport.user
      }
    })
    .then(foundUser => {
			return pRequest({
				url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${foundUser.authToken}`
				}
			})
			.then(recentSongs => {
				if (!recentSongs) {
					const err = new Error('no recent tracks played');
					err.status = 404;
					next(err);
				} else {
					res.send(recentSongs);
				}
			});
		})
		.catch(next);
	}
});

module.exports = router;
