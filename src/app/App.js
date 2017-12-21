import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { fetchAllUnits } from '../actions'

import Search from '../components/search'
import Unit from '../components/unit'
import Header from '../components/header'

import './App.css'

class App extends Component {
  componentDidMount () {
    this.props.fetchAllUnits()
  }

  render () {
    return (
      <Router>
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
            <Route path='/unit/:unitCode' component={Unit} />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    shouldDisplayUnit: (state.unitHistory.currentUnit !== '')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUnits: () => {
      dispatch(fetchAllUnits())
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(App)

export default c
