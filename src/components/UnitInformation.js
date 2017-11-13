import React, { Component } from 'react'

class UnitInformation extends Component {
  render () {
    // determine how the inner workings of the unitInformation should be displayed
    let body = null
    if (this.props.isFetching) {
      body = <div>loading...</div>
    } else if (this.props.didInvalidate) {
      body = <div>failed! :(</div>
    } else {
      // unitDetails should always exist if the API request was successful, but this additional check is just protective
      if (this.props.unitDetails) {
        body = (
          <div>
            <h2>{this.props.unitDetails.unitName}</h2>
            <p>{this.props.unitDetails.description}</p>
          </div>
        )
      }
    }

    // only render unit details if a unit has been selected
    if (this.props.unitCode !== '') {
      return (
        <div className='App-UnitDetails'>
          <h1>{this.props.unitCode}</h1>
          {body}
        </div>
      )
    } else {
      return null
    }
  }
}

export default UnitInformation
