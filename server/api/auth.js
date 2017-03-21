const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
// var db = require('../../db');
// var User = db.user;
// var Playlist = db.playlist;
// var Song = db.song;
// const pRequest = require('request-promise');

router.get('/spotify',
  passport.authenticate('spotify'),
  function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
    console.error('you should not be here right now.')
  });

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res, next) {
    // Successful authentication, redirect home.
    res.redirect('/');
    next();
  });


// function login(callback) {
//   var CLIENT_ID = '6b284830006843e7ae7b170725715aed';
//   var REDIRECT_URI = 'http://jmperezperez.com/spotify-oauth-jsfiddle-proxy/';
//   function getLoginURL(scopes) {
//     return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
//       '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
//       '&scope=' + encodeURIComponent(scopes.join(' ')) +
//       '&response_type=token';
//   }
//
//   var url = getLoginURL(['user-read-email']);
// }
//
// function getUserData(accessToken) {
//   return axios.get('https://api.spotify.com/v1/me', {
//     headers: {
//        'Authorization': 'Bearer ' + accessToken
//     }
//   });
// }
//
// router.get('/spotify', (req, res, next) => {
//   login(function(accessToken) {
//     console.log(accessToken);
//     getUserData(accessToken)
//     .then(function(response) {
//       console.log(response);
//       //loginButton.style.display = 'none';
//       //resultsPlaceholder.innerHTML = template(response);
//     });
//   });
// });

module.exports = router;
