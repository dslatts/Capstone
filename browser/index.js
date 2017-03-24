'use strict';

import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import DataVisual from './components/DataVisual'

import store from './store';
import HomeContainer from './containers/HomeContainer';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomeContainer}  />
      <Route path="/tests" component={DataVisual} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
