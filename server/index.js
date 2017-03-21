'use strict';

const session = require('express-session');
const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const finalHandler = require('finalhandler');
const SpotifyStrategy = require('passport-spotify').Strategy;
const db = require('../db');
const User = db.user;

const app = express();

  app.use(require('volleyball'));

module.exports = app
  // Body parsing middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Authentication middleware
  // app.use(session({
  //   secret: 'string',
  //   resave: false,
  //   saveUnitilized: false
  // }));

  // app.use((res, req, next) => {
  //     console.log('this is to show us what session it is', req.session);
  //     next();
  // });


  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
    });

  passport.deserializeUser((id, done) => {
    console.log('hello, im inside deserializeUser');
    User.findById(id)
    .then(user => done(null, user))
    .catch(done);
  });

  passport.use(new SpotifyStrategy({
  clientID: 'a9238ea915474eca9984060f2358a6c8',
  clientSecret: '0c24a20a960d4614a4dede424aebe4d6',
  callbackURL: 'http://localhost:1337/api/auth/callback'
},
  (accessToken, refreshToken, profile, done) => {
    console.log('--- inside ze spotifystrategy ---')
    User.findOrCreate({spotifyId: profile.id}, (err, user) => {
      return done(err, user);
    });
  }
));

  // Serve static files from ../public
  app.use(express.static(resolve(__dirname, '..', 'public')));

  // Serve our api - ./api also requires in ../db, which syncs with our database
  app.use('/api', require('./api.js'));

  // Send index.html for anything else.
  app.get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')));

  // Error middleware interceptor, delegates to same handler Express uses.
  // https://github.com/expressjs/express/blob/master/lib/application.js#L162
  // https://github.com/pillarjs/finalhandler/blob/master/index.js#L172
  app.use((err, req, res, next) => {
    console.error(err);
    finalHandler(req, res)(err);
  });

if (module === require.main) {

  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server ---`);
      const { address, port } = server.address();
      const host = address === '::' ? 'localhost' : address;
      const urlSafeHost = host.includes(':') ? `[${host}]` : host;
      console.log(`Listening on http://${urlSafeHost}:${port}`);
    }
  );
}
