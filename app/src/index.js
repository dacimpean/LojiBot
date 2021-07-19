import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import 'bootstrap/scss/bootstrap.scss';
import './assets/main.scss';

import App from './App';
import { jwt } from './utils';
import { store } from './store';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appStore = createStore(store, composeEnhancers(applyMiddleware(jwt, thunk)));

ReactDOM.render(<App store={appStore} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
