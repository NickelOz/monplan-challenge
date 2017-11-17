import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

import './index.css'
import App from './app/App.js'
import registerServiceWorker from './registerServiceWorker'

const logger = createLogger({
  collapsed: true
})

let store = createStore(
  reducers,
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
