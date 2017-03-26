'use strict';

var db = require('./_db');

var Artist = require('./models/artists');
var User = require('./models/users');
var Playlist = require('./models/playlists');
var Song = require('./models/songs');
var AudioFeature = require('./models/audiofeatures');

User.belongsToMany(Song, {through: 'UserFavSongs'});
User.hasMany(Playlist);
Song.belongsToMany(User, {through: 'UserFavSongs'});
Song.belongsToMany(Playlist, {through: 'PlaylistSongs'});
Playlist.belongsTo(User);
Playlist.belongsToMany(Song, {through: 'PlaylistSongs'});

module.exports = db;
