import React, { Component } from 'react'
import 'whatwg-fetch'
import logo from './logo.svg'
import './App.css'
import SearchBar from '../containers/SearchBar'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Monash Handbook Unit Viewer</h1>
        </header>
        <div className='App-main'>
          <SearchBar />
        </div>
      </div>
    )
  }
}

export default App
