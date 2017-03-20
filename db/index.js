'use strict';

var db = require('./_db');

var Artist = require('./models/artists');
var User = require('./models/users');
// var Album = require('./albums');
var Playlist = require('./models/playlists');
var Song = require('./models/songs');

// Album.hasMany(Song);
// Album.belongsTo(Artist);
User.belongsToMany(Song, {through: 'UserFavSongs'});
User.hasMany(Playlist);
// Song.belongsTo(Artist);
// Artist.hasMany(Song);
// Song.belongsTo(Album)
Song.belongsToMany(User, {through: 'UserFavSongs'});
Song.belongsToMany(Playlist, {through: 'PlaylistSongs'});
// Artist.hasMany(Album);
Playlist.belongsTo(User);
Playlist.belongsToMany(Song, {through: 'PlaylistSongs'});

var syncedDbPromise = db.sync({force: true});

syncedDbPromise.then(function () {
  console.log('Sequelize models synced to PostgreSQL');
});

module.exports = syncedDbPromise;
