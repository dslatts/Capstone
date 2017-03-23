'use strict';

import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import {fetchUser} from './actions/user';
import HomeContainer from './containers/HomeContainer';

const onHomeEnter = function(){
  fetchUser()(store.dispatch);
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={onHomeEnter} component={HomeContainer}  />
      <Route path="/api/auth/spotify" />
    </Router>
  </Provider>,
  document.getElementById('app')
);
