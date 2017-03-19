'use strict';

var db = require('./_db');

// var Artist = require('./models/artists');
var User = require('./models/users');
// var Album = require('./albums');
var Playlist = require('./models/playlists');
var Song = require('./models/songs');

// Album.hasMany(Song);
// Album.belongsTo(Artist);
User.belongsToMany(Song, {through: 'userFavSongs'});
User.hasMany(Playlist);
// Song.belongsTo(Album)
Song.belongsToMany(User, {through: 'UserFavSongs'});
Song.belongsToMany(Playlist, {through: 'PlaylistSongs'});
// Artist.hasMany(Album);
Playlist.belongsTo(User);
Playlist.belongsToMany(Song, {through: 'PlaylistSongs'});

module.exports = db;
