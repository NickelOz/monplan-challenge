import React, { Component } from 'react'

class UnitInformation extends Component {
  render () {
    if (this.props.currentUnit !== null) {
      return (
        <div className='App-UnitDetails' >
          <h1>{this.props.unitCode}</h1>
        </div>
      )
    } else {
      return (
        <div className='App-UnitDetails' />
      )
    }
  }
}

export default UnitInformation
