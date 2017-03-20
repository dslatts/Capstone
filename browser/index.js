'use strict';

import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';

import store from './store.jsx';
import HomePage from './components/HomePage';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomePage} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
