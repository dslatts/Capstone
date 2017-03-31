const router = require('express').Router();
const Promise = require('bluebird');
var db = require('../../db');
var User = db.models.user;
// var Playlist = db.models.playlist;
var Song = db.models.song;
var History = db.models.history;
const pRequest = require('request-promise');

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

    return Promise.all([allUsers, oneUser])
    .then(([foundAllUsers, foundUser]) => {
      const useravg = foundAllUsers.map(user => user.audioFeatures)
                                   .reduce((acc, userfeatures) => userfeatures
                                            .map((feature, index) => acc[index] + feature), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                          )
                                   .map(feature => feature / foundAllUsers.length);
      const usersavgObj = {
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
      };
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
      return Promise.all([userProfile, recentSongs])
      .spread((foundUserProfile, foundRecentSongs) => {
        var SongIds = JSON.parse(foundRecentSongs).items.map(song => song.track.id).join(',');
        var SongFeatures = pRequest({
          url: 'https://api.spotify.com/v1/audio-features?ids=' + SongIds,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${foundUser.authToken}`
          }
        });
        var seen = {};
        var songlist = JSON.parse(foundRecentSongs).items.filter(item => seen.hasOwnProperty(item.track.id) ? false : (seen[item.track.id] = true)).map(songObj => {
          return Song.findOrCreate({
            where: {
              title: songObj.track.name,
              spotifyId: songObj.track.id
            }
          });
        });
        const p1 = Promise.all(songlist);
        return Promise.all([p1, SongFeatures])
        .then(arrayofitems => {
          var newAvg = JSON.parse(arrayofitems[1]).audio_features.filter(function( element ) {return !!element;}).reduce((acc, audio) => {
            if (audio){
              return Object.keys(audio).slice(0, 11).map((feature, index) => {
                return acc[index] + audio[feature];
              });
            }
          }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]).map(feature => feature / JSON.parse(arrayofitems[1]).audio_features.length);
          const newAvgObj = {
            danceability: newAvg[0],
            energy: newAvg[1],
            key: newAvg[2],
            loudness: newAvg[3],
            mode: newAvg[4],
            speechiness: newAvg[5],
            acousticness: newAvg[6],
            instrumentalness: newAvg[7],
            liveness: newAvg[8],
            valence: newAvg[9],
            tempo: newAvg[10]
          };
          const UserHistory = History.create(newAvgObj)

          var updateUser = foundUser.update({
            audioFeatures: newAvg
          });
          const reformattedRecentSongs = JSON.parse(foundRecentSongs).items.map((song, index) => ({
            artists: song.track.artists,
            duration: song.track.duration_ms,
            href: song.track.href,
            id: song.track.id,
            name: song.track.name,
            preview_url: song.track.preview_url,
            context: song.context,
            played_at: song.played_at,
            audio_features: JSON.parse(arrayofitems[1]).audio_features[index]
          }));
          return Promise.all([UserHistory, updateUser])
          .then(([newUserHistory, updatedUser]) => {
            const updatedArrOfSongs = arrayofitems[0].map(item => {
              newUserHistory.setSongs(item[0]);
            });
            const historyAssociation = newUserHistory.setUser(foundUser);
            return Promise.all([updatedArrOfSongs, historyAssociation])
            .then(() => {
              return User.findOne({
                where: {
                  name: req.session.passport.user
                },
                include: [{
                  model: History, include: [{model: Song}]
                }]
              })
              .then(refreshedUser => res.status(201).send(
                {
                  spotifyProfile: foundUserProfile,
                  allUsersAvg: usersavgObj,
                  recentSongs: reformattedRecentSongs,
                  localProfile: refreshedUser
                }
              ));
            });
          })
          .catch(err => console.error('THISISMYERROR', err));
          // NOTE array of items = [songs, SongFeatures]
        })
        .catch(next);
      })
      .catch(next);
    });
  }
});

module.exports = router;
