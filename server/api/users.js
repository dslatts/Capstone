const router = require('express').Router();
const Promise = require('bluebird');
var db = require('../../db');
var User = db.models.user;
var Playlist = db.models.playlist;
var Song = db.models.song;
var Artist = db.models.artist;
const pRequest = require('request-promise');

// router.get('/', (req, res, next) => {
//   req.session.passport.token = 'hello world';
//   console.log(req.session.passport);
//   res.send(req.session);
// });

router.get('/profile', (req, res, next) => {
  if (!req.session.passport){
    const err = new Error('need to be logged in to use this function');
    err.status = 403;
    next(err);
  } else {
    const allUsers = User.findAll()
    const oneUser = User.findOne({
      where: {
        name: req.session.passport.user
      }
    })

    Promise.all([allUsers, oneUser])
    .then(([foundAllUsers, foundUser]) => {
      const useravg = foundAllUsers.map(user => user.audioFeatures)
                                   .reduce((acc, userfeatures) => userfeatures
                                            .map((feature, index) => acc[index] + feature), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                          )
                                   .map(feature => feature / foundAllUsers.length)
      const useravgObj = {
        danceability: useravg[0],
        energy: useravg[1],
        key: useravg[2],
        loudness: useravg[3],
        mode: useravg[4],
        speechiness: useravg[5],
        acousticness: useravg[6],
        instrumentalness: useravg[7],
        liveness: useravg[8],
        valence: useravg[9],
        tempo: useravg[10]
      }
      let topArtists = pRequest({
        url: `https://api.spotify.com/v1/me/top/artists/`,
        method: 'GET',
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${foundUser.authToken}`
        }
      });
      let topSongs = pRequest({
        url: `https://api.spotify.com/v1/me/top/tracks`,
        method: 'GET',
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${foundUser.authToken}`
        }
      });
      let userPlaylists = pRequest({
        url: `https://api.spotify.com/v1/me/playlists`,
        method: 'GET',
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${foundUser.authToken}`
        }
      });
      let userProfile = pRequest({
        url: `https://api.spotify.com/v1/me`,
        method: 'GET',
        json: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${foundUser.authToken}`
        }
      });
      let recentSongs = pRequest({
				url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${foundUser.authToken}`
				}
			});
      Promise.all([topArtists, topSongs, userPlaylists, userProfile, recentSongs])
      .spread((foundTopArtists, foundTopSongs, foundUserPlaylists, foundUserProfile, foundRecentSongs) => {
        console.log(foundRecentSongs);
        var artistlist = foundTopArtists.items.map(artistObj => {
          return Artist.findOrCreate({
            where: {
              name: artistObj.name,
              spotifyId: artistObj.id
            }
          });
        });
        var songlist = foundTopSongs.items.map(songObj => {
          return Song.findOrCreate({
            where: {
              title: songObj.name,
              spotifyId: songObj.id
            }
          });
        });
        var playlistlist = foundUserPlaylists.items.map(playlistObj => {
          return Playlist.findOrCreate({
            where: {
              title: playlistObj.name,
              spotifyId: playlistObj.id
            }
          });
        });

        const p1 = Promise.all(artistlist);
        const p2 = Promise.all(songlist);
        const p3 = Promise.all(playlistlist);
        Promise.all([p1, p2, p3])
        .then(arrayofitems => {
          const updatedArrOfSongs = arrayofitems[1].map(item => {
            item[0].setUsers(foundUser);
          });
          const updatedArrofPlaylists = arrayofitems[2].map(item => {
            item[0].setUser(foundUser);
          });
          return Promise.all([updatedArrOfSongs, updatedArrofPlaylists])
          // NOTE array of items = [artists, songs, playlists]
          .then(() => res.status(201).send([arrayofitems[0], arrayofitems[1], arrayofitems[2], foundUserProfile, useravgObj, JSON.parse(foundRecentSongs)]));
        })
        .catch(next);
      })
      .catch(next);
    });
  }
});

module.exports = router;
