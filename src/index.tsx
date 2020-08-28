import 'array-flat-polyfill';

import * as serviceWorker from './serviceWorker';

import { applyMiddleware, createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './app/App';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import {verifyCredentials} from "./app/auth/duck/actions";

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk),
));
verifyCredentials(store);

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
