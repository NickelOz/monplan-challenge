import React, { Component } from 'react'

class UnitDescription extends Component {
  render () {
    return (
      <div className='App-unitDesc'>
        <p>{this.props.description}</p>
      </div>
    )
  }
}

export default UnitDescription
