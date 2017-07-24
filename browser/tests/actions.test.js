import {expect} from 'chai';
import {getAlbums, removeAlbums} from '../actions/album';
import {setTrue, setFalse} from '../actions/loading';
import {getPlaylist} from '../actions/playlist';
import {getSongs, removeSongs, removeAll} from '../actions/songs'
import {setUser, removeUser, updatePlaylists} from '../actions/user'

describe('Album Action Creators', () => {
    describe('getAlbums', () => {
        it('returns properly formatted action', () => {
            const testAlbums = { albums: { items: ['album1', 'album2']}};
            expect(getAlbums(testAlbums)).to.be.deep.equal({
                type: 'GET_ALBUMS',
                receivedAlbums: testAlbums
            });
        });
    });
    describe('removeAlbums', () => {
        it('returns properly formatted action', () => {
            expect(removeAlbums()).to.be.deep.equal({
                type: 'REMOVE_ALBUMS'
            });
        });
    });
});
describe('Page Loading Action Creators', () => {
    describe('setTrue', () => {
        it('returns properly formatted action', () => {
            expect(setTrue()).to.be.deep.equal({
                type: 'SET_TRUE', isLoading: true
            });
        });
    });
    describe('setFalse', () => {
        it('returns properly formatted action', () => {
            expect(setFalse()).to.be.deep.equal({
                type: 'SET_FALSE', isLoading: false
            });
        });
    });
});
describe('Playlist Action Creators', () => {
    describe('getPlaylist', () => {
        it('returns properly formatted action', () => {
            const testPlaylistId = 'aRandomString';
            const testAudioFeatures = [{feat1: 'one', feat2: 1}, {feat1: 'two', feat2: 2}];
            expect(getPlaylist(testPlaylistId, testAudioFeatures)).to.be.deep.equal({
                type: 'GET_PLAYLIST', playlistId: testPlaylistId, audioFeatures: testAudioFeatures
            });
        });
    });
});
describe('Songs Action Creators', () => {
    const testSong = {artist: 'Singer', album: 2};
    describe('getSongs', () => {
        it('returns properly formatted action', () => {
            expect(getSongs(testSong)).to.be.deep.equal({
                type: 'GET_SONGS', receivedSong: testSong
            });
        });
    });
    describe('removeSongs', () => {
        it('returns properly formatted action', () => {
            expect(removeSongs(testSong)).to.be.deep.equal({
                type: 'REMOVE_SONGS', songToRemove: testSong
            });
        });
    });
    describe('removeAll', () => {
        it('returns properly formatted action', () => {
            expect(removeAll()).to.be.deep.equal({
                type: 'REMOVE_ALL'
            });
        });
    });
});
describe('User Action Creators', () => {
    describe('setUser', () => {
        it('returns properly formatted action', () => {
            const testUser = {id: 42, name: 'username'};
            expect(setUser(testUser)).to.be.deep.equal({
                type: 'SET_USER', currentUser: testUser
            });
        });
    });
    describe('removeUser', () => {
        it('returns properly formatted action', () => {
            expect(removeUser()).to.be.deep.equal({
                type: 'REMOVE_USER'
            });
        });
    });
    describe('updatePlaylists', () => {
        it('returns properly formatted action', () => {
            const testPlaylists = [{ id: 123, songs: ['song1', 'song2'] }, { id: 456, songs: ['song3', 'song4'] }];
            expect(updatePlaylists(testPlaylists)).to.be.deep.equal({
                type: 'UPDATE_PLAYLISTS', playlists: testPlaylists
            });
        });
    });
});
