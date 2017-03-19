'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
// const passport = require('passport');
const finalHandler = require('finalhandler');

const app = express();

  app.use(require('volleyball'));

module.exports = app
  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Authentication middleware
  // .use(passport.initialize())
  // .use(passport.session())

  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))

  // Serve our api - ./api also requires in ../db, which syncs with our database
  .use('/api', require('./api.js'))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  // Error middleware interceptor, delegates to same handler Express uses.
  // https://github.com/expressjs/express/blob/master/lib/application.js#L162
  // https://github.com/pillarjs/finalhandler/blob/master/index.js#L172
  .use((err, req, res, next) => {
    console.error(err);
    finalHandler(req, res)(err);
  });

if (module === require.main) {
  // Start listening only if we're the main module.
  //
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server ---`);
      const { address, port } = server.address();
      const host = address === '::' ? 'localhost' : address;
      const urlSafeHost = host.includes(':') ? `[${host}]` : host;
      console.log(`Listening on http://${urlSafeHost}:${port}`);
    }
  );}
