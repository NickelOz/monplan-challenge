import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import unitApp from './reducers'

import './index.css'
import App from './app/App.js'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(
  unitApp,
  applyMiddleware(
    thunk,
    logger
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
