'use strict'; // eslint-disable-line semi

const api = module.exports = require('express').Router(); // eslint-disable-line new-cap

api
  .use('/artists', require('./api/artists'))
  .use('/users', require('./api/users'))
  .use('/playlists', require('./api/playlists'))
  .use('/albums', require('./api/albums'));

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
