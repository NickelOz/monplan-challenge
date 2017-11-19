import React from 'react'
import { render } from 'react-dom'
import App from './app/App.js'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './theme.js'

import './index.css'

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
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
