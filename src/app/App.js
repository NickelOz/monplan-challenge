import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'
import { fetchAllUnits } from '../actions'
import logo from './logo.svg'
import './App.css'
import SearchBar from '../containers/SearchBar'
import UnitInformation from '../containers/UnitInformation'

class App extends Component {
  componentDidMount () {
    this.props.fetchAllUnits()
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          {/* <h1 className='App-title'>Monash Handbook Unit Viewer</h1> */}
        </header>
        <div className='App-main'>
          <div className='App-title'>
            <h1>MUSE</h1>
            <h2>Monash Unit Search Engine</h2>
          </div>
          <SearchBar />
          <UnitInformation />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUnits: () => {
      dispatch(fetchAllUnits())
    }
  }
}

const c = connect(null, mapDispatchToProps)(App)

export default c
