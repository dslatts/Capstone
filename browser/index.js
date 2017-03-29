'use strict';

import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Sunburst from './datavis/Sunburst.js';

import store from './store';
import {fetchUser, fetchPlaylist} from './actions/user';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';
import PlaylistContainer from './containers/PlaylistContainer';
import LoadingContainer from './containers/LoadingContainer';
const refreshUser = function(){
  store.dispatch(fetchUser())
};
const loadPlaylists = function(){
  store.dispatch(fetchPlaylist());
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={refreshUser} component={HomeContainer} />
      <Route path="/tests" component={Sunburst} />
      <Route path="/load" onEnter={refreshUser} component={LoadingContainer} />
      <Route path="/:username/profile" onEnter={loadPlaylists} component={ProfileContainer} />
      <Route path="/:playlist/confirm" onEnter={loadPlaylists} component={PlaylistContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
