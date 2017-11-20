import React, { Component } from 'react'

class UnitTitle extends Component {
  render () {
    return (
      <div className='App-unitTitle'>
        <h1>{this.props.unitName}</h1>
        <h2>{this.props.faculty}</h2>
        <h2>
          {this.props.locationAndTime.map((block, index) => {
            return ((index > 0) ? ', ' : '') + block.location
          })}
        </h2>
      </div>
    )
  }
}

export default UnitTitle
