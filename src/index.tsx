import 'array-flat-polyfill'

import * as serviceWorker from './serviceWorker'

import { applyMiddleware, createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/react'

import App from './app/App'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'
import { verifyCredentials } from './app/components/auth/duck/actions'
import Config from './config'

if (Config.env === 'production') {
  Sentry.init({
    dsn:
      'https://547d447dc4fa47068b254b47082ea311@o340561.ingest.sentry.io/5338625',
    environment: Config.env,
  })
}

const sentryReduxEnhancer = Sentry.createReduxEnhancer({})
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk), sentryReduxEnhancer)
)
verifyCredentials(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
