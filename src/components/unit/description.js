import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UnitDescription extends Component {
  render () {
    return (
      <div className='App-unitDesc'>
        <p>{this.props.description}</p>
      </div>
    )
  }
}

UnitDescription.propTypes = {
  description = PropTypes.string.isRequired
}

export default UnitDescription
