'use strict';

const session = require('express-session');
const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const finalHandler = require('finalhandler');
const SpotifyStrategy = require('passport-spotify').Strategy;
const Promise = require('bluebird');
const db = require('../db');
// console.log(db);
const User = db.models.user;

const app = express();

app.use(require('volleyball'));

module.exports = app
  // Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Authentication middleware

app.use(session({
  secret: 'string',
  resave: false,
  saveUninitialized: false
}));

app.use('/numVisits', function(req, res, next){
  // console.log(req);
  var sess = req.session;
  if (sess.number === undefined) {
    sess.number = 0;
  } else {
    sess.number++;
  }
  res.status(200).send(sess);
});

app.use('/',(req, res, next) => {
  console.log('this is to show us what session it is', req.session);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
  });

passport.deserializeUser((id, done) => {
  console.log('hello, im inside deserializeUser');
  done(null, 'hi');
  // User.findOne({
  //   where: {
  //     spotifyId: id
  //   }
  // })
  // .then(user => {
  //   console.log(user);
  //   console.log(user.authToken);
  //   user.token = user.authToken;
  //   var newUser = {token: user.authToken};
  //   console.log(newUser);
  //   done(null, newUser);
  // })
  // .catch(done);
});

passport.use(new SpotifyStrategy(
  {
    clientID: 'a9238ea915474eca9984060f2358a6c8',
    // TODO MUST REMOVE THE CLIENT SECRET
    clientSecret: '4a5196f57e1e459fa49b19ef620149c1',
    callbackURL: 'http://localhost:1337/api/auth/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken: ');
    console.log(accessToken);
    // console.log('refreshToken: ')
    // console.log(refreshToken);
    console.log(profile);
    // console.log("ID: ", profile.id)
    // console.log('--- inside ze spotifystrategy ---')
    User.findOne({
      where: {
        name: profile.username,
        spotifyId: profile.id
      }
    })
    .then(user => {
      if (!user) {
        return User.create({
            name: profile.username,
            spotifyId: profile.id,
            authToken: accessToken
        });
      } else {
        console.log(accessToken);
        console.log('im in the update');
        return user.update({
            authToken: accessToken
        })
      }
    })
    .then(selectedUser => console.log('selectedUser'))

    // User.findOrCreate({
    //   where: {
    //     name: profile.username,
    //     spotifyId: profile.id,
    //     authToken: accessToken
    //   }
    // })
    // .spread((user, wasCreatedBool) => {
    //   console.log('successfully created user');
    // })
    // return done(null, {username: profile.id, password: accessToken});
    profile.password = accessToken;
    console.log('checking for password addition: ', profile);
    return done(null, profile);
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
      db.sync({force: false})
      .then(function () {
        console.log('Oh and btw the postgres server is totally connected, too');
      });
    }
  );
}
