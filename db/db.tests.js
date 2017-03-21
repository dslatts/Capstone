var chai = require('chai');
var mocha = require('mocha');
var request = require('supertest-as-promised');
var chaiProperties = require('chai-properties');
var chaiThings = require('chai-things');
var db = require('./index.js');
chai.use(chaiProperties);
chai.use(chaiThings);
var expect = chai.expect;
var Artist = require('./models/artists');
var Playlist = require('./models/playlists');
var Song = require('./models/Songs');
var User = require('./models/Users');
var Promise = require('bluebird');


before('wait for the db', () => db.didSync);

describe('artist model', () => { 
	it('has the expected schema definition', () => {
		expect(Artist.attributes.name).to.be.an('object');
		expect(Artist.attributes.spotifyId).to.be.an('object');
	}) 
})

describe('playlist model', () => {
	it('has the expected schema definition', () => {
		expect(Playlist.attributes.title).to.be.an('object');
		expect(Playlist.attributes.spotifyId).to.be.an('object');
	}) 
})

describe('song model', () => {
	it('has the expected schema definition', () => {
		expect(Song.attributes.title).to.be.an('object');
		expect(Song.attributes.spotifyId).to.be.an('object');
	}) 
})

describe('user model', () => {
	it('has the expected schema definition', () => {
		expect(User.attributes.name).to.be.an('object');
		expect(User.attributes.spotifyId).to.be.an('object');
	})
})

describe('associations', () => {
	//TODO: Test 
	it('playlist belongs to user', () => {
	    let creatingPlaylist = Playlist.create({
	        title: 'funny playlist',
	        spotifyId: 'test'
	    })
	    let creatingUser = User.create({
	        name: 'Benjibooty',
	        spotifyId: 'test1'
	    })

	return Promise.all([creatingUser, creatingPlaylist])
	    .spread((createdUser, createdPlaylist) => {
	        return createdPlaylist.setUser(createdUser);
	    })
	    .then(foundPlaylist => {
	        expect(foundPlaylist.user_id).to.exist;
	    })
	})
})