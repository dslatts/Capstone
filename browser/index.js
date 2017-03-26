'use strict';

import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Sunburst from './datavis/Sunburst.js';

import store from './store';
import {fetchUser} from './actions/user';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';
import PlaylistContainer from './containers/PlaylistContainer';

const refreshUser = function(){
  fetchUser()(store.dispatch);
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={refreshUser} component={HomeContainer} />
       <Route path="/tests" component={Sunburst} />
      <Route path="/:username/profile" component={ProfileContainer} />
      <Route path="/:playlist/confirm" onEnter={refreshUser} component={PlaylistContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
