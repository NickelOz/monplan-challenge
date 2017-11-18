import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'
import { fetchAllUnits } from '../actions'
// import logo from './logo.svg'
import './App.css'
import Search from '../containers/search'
import Unit from '../containers/unit'
import Header from '../components/header'

class App extends Component {
  componentDidMount () {
    this.props.fetchAllUnits()
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <Header />
        </div>
        <div className='App-main'>
          <div className='App-title'>
            <h1>MUSE</h1>
            <h2>Monash Unit Search Engine</h2>
          </div>
          <Search />
          <Unit />
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
