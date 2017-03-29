const router = require('express').Router();
const passport = require('passport');

router.get('/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-read-birthdate', 'user-read-email', 'playlist-modify-private', 'playlist-modify-public', 'user-top-read', 'playlist-read-private', 'user-read-recently-played'],
    showDialog: true
  }),
  function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
    console.error('you should not be here right now.')
  });

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res, next) {
    // Successful authentication, redirect home.
    res.redirect('/load');
    next();
  });

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
