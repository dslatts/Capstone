var chai = require('chai');
var mocha = require('mocha');
var request = require('supertest-as-promised');
var expect = chai.expect();
var app = require('./index.js');
var agent = request.agent(app)

describe('Search', function() {
  var artist = {
    name: "Alicia Keys",
    albums: [
      {
        name: 'the dairy of alicia keys',
        songs: [

        ]
      }
    ]
  }

  var user = {
    name:'justinzhou93'
  };


  describe('GET artists', function() {
    it('returns all artists from spotify API', function() {
      // remember to use search query api, not the regular artist pull. need id of artist first.
      agent
      .get(`/artist/${artist.name}`)
      // need to do following in the route
      // .send({
      //   q: artist.name,
      //   type: 'artist'
      // })
      .expect(200)
      .expect(function(res){
        expect(res.body.artists.items).to.be.an.instanceOf(Array);
        expect(res.body.artists.items[0].name).to.equal('Alicia Keys');
      })
    })
  })


  describe('GET artist albums', function(){
    it('returns all albums of queried artist from spotify API', function(){
      agent
      .get(`/artist/${artist.name}/albums`)
      .expect(200)
      .expect(function(res){
        expect(res.body.items).to.be.an.instanceOf(Array);
        expect(res.body.items[0].name.toLowerCase()).to.equal('the diary of alicia keys');
        expect(res.body.items[0].id).to.be.a('string');
      })
    })
  })


  describe('GET album songs', function(){
    it('returns all songs of a selected album', function(){
      agent
      .get(`/artist/${artist.name}/albums/${artist.albums[0]}/songs`)
      .expect(200)
      .expect(function(res){
        expect(res.body.items).to.be.an.instanceOf(Array);
        expect(res.body.items.length).to.equal(15);
        expect(res.body.items[0].name.toLowerCase()).to.equal('harlem\'s nocturne');
        expect(res.body.items[0].id).to.be.a('string');
      })
    })
  })


//TODO: Fill in these routes!!
describe('Create Playlists', function() {
  describe('Create a playlist for a logged in user', function() {
    it('checks if the user is logged in', function() {

    })
    it('adds to the playlists of that user', function() {

    })
  })
})

describe('User', function(){
  describe('find user top tracks', function(){
    it('finds all top tracks of current user', function(){
      agent
      .get(`/user/${user.name}/top/tracks`)
      .expect(200)
      .expect(function(res){
        expect(res.body.favoriteSongs).to.be.an.instanceOf(Array);
        expect(res.body.favoriteSongs.length).to.not.equal(0);
      })
    })
  })
  describe('find friends', function(){
    it('returns all friends', function(){
      agent
      .get(`/user/${user.name}/friends`)
      .expect(200)
      .expect(function(res){
        expect(res.body.items[0].name).to.not.be.null
      })
    })
  })
  describe('pull playlists of user', function(){
    it('returns list of playlists', function(){
      agent
      .get(`/user/${user.name}/friends/playlists`)
      .expect(200)
      .expect(function(res){
        expect(res.body.items[0].name).to.equal('Discover Weekly')
        })
      })
    })
  })
})
