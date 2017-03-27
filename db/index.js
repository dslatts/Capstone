'use strict';

var db = require('./_db');

var Artist = require('./models/artists');
var User = require('./models/users');
var Playlist = require('./models/playlists');
var Song = require('./models/songs');
var History = require('./models/histories');

User.belongsToMany(Song, {through: 'UserFavSongs'});
User.hasMany(Playlist);
User.hasMany(History);
Song.belongsToMany(User, {through: 'UserFavSongs'});
Song.belongsToMany(Playlist, {through: 'PlaylistSongs'});
Song.belongsToMany(History, {through: 'SongHistory'});
Playlist.belongsTo(User);
Playlist.belongsToMany(Song, {through: 'PlaylistSongs'});
History.belongsTo(User);
History.belongsToMany(Song, {through: 'SongHistory'});


module.exports = db;
