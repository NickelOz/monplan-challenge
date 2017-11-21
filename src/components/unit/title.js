import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

UnitTitle.propTypes = {
  unitName: PropTypes.string.isRequired,
  faculty: PropTypes.string.isRequired,
  locationAndTime: PropTypes.array.isRequired
}

export default UnitTitle
