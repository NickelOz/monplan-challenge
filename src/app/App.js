import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'
import { updateAllUnitCodes } from '../actions'
import logo from './logo.svg'
import './App.css'
import SearchBar from '../containers/SearchBar'

class App extends Component {
  componentDidMount () {
    fetch('https://monplan-api-dev.appspot.com/basic/units')
      .then(response => {
        console.log(response.ok)
        if (response.ok && response.headers.get('content-type').includes('application/json')) {
          return response.json()
          // console.log('running')
          // const units = Array.from(response.json(), unit => {
          //   console.log('running')
          //   return unit.unitCode
          // })
          // this.props.updateAllUnits(units)
        } else {
          // this.props.updateAllUnits([])
          return []
        }
      })
      .then(json => {
        const units = Array.from(json, unit => {
          console.log(unit.unitCode)
          return unit['unitCode']
        })
        this.props.updateAllUnitCodes(units)
      })
  }

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

const mapDispatchToProps = dispatch => {
  return {
    updateAllUnitCodes: unitCodes => {
      dispatch(updateAllUnitCodes(unitCodes))
    }
  }
}

const c = connect(null, mapDispatchToProps)(App)

export default c
