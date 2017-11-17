import React, { Component } from 'react'

class UnitButton extends Component {
  render () {
    return (
      <button
        onClick={() => this.props.updateCurrentUnit(this.props.unitCode)}
      >
        {this.props.unitCode}
      </button>
    )
  }
}

export default UnitButton
