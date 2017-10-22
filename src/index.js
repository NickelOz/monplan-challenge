import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import unitApp from './reducers'

import './index.css'
import App from './app/App.js'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(unitApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
