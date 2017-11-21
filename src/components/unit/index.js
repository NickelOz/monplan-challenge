import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import UnitHeader from './header'
import UnitTitle from './title'
import UnitDescription from './description'
import UnitRatings from './ratings'
import UnitRequirements from './requirements'

class Unit extends Component {
  render () {
    // determine how the inner workings of the unit should be displayed
    let body = null
    if (this.props.isFetching) {
      body = (
        <div className='App-unitBody'>
          <div style={style.loadingContainer}>
            <RefreshIndicator
              status='loading'
              top={0}
              left={0}
              size={100}
              style={style.loading}
            />
          </div>
          <h3>{`Loading ${this.props.unitCode}`}</h3>
        </div>
      )
    } else if (this.props.didInvalidate) {
      body = (
        <div className='App-unitBody'>
          <h1>{`Could not load unit details for ${this.props.unitCode}`}</h1>
        </div>
      )
    } else {
      // unitDetails should always exist if the API request was successful, but this additional check is just protective
      if (this.props.unitDetails) {
        body = (
          <div className='App-unitBody'>
            <UnitTitle
              unitName={this.props.unitDetails.unitName}
              faculty={this.props.unitDetails.faculty}
              locationAndTime={this.props.unitDetails.locationAndTime}
            />
            <Divider />
            <UnitDescription
              description={this.props.unitDetails.description}
            />
            <Divider />
            <UnitRatings
              learnScore={this.props.unitDetails.learnScore}
              enjoyScore={this.props.unitDetails.enjoyScore}
            />
            <Divider />
            <UnitRequirements
              proh={this.props.unitDetails.proh}
              preqs={this.props.unitDetails.preqs}
              updateCurrentUnit={unitCode => this.props.updateCurrentUnit(unitCode)}
            />
          </div>
        )
      }
    }
    // only render unit details if a unit has been selected
    return (
      <Paper
        zDepth={3}
        className='App-unit'
      >
        <UnitHeader
          unitCode={this.props.unitCode}
          hasPreviousUnit={this.props.hasPreviousUnit}
          loadPreviousUnit={() => this.props.loadPreviousUnit()}
          reloadCurrentUnit={() => this.props.reloadCurrentUnit()}
          clearCurrentUnit={() => this.props.clearCurrentUnit()}
        />
        {body}
      </Paper>
    )
  }
}

const style = {
  loadingContainer: {
    display: 'inline-block'
  },
  loading: {
    position: 'relative'
  }
}

Unit.propTypes  = {
  // display state
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  // header
  unitCode: PropTypes.string.isRequired,
  hasPreviousUnit: PropTypes.bool.isRequired,
  loadPreviousUnit: PropTypes.func.isRequired,
  reloadCurrentUnit: PropTypes.func.isRequired,
  clearCurrentUnit: PropTypes.func.isRequired,
  // title
  unitName: PropTypes.string,
  faculty: PropTypes.string,
  locationAndTime: PropTypes.array,
  // description
  description: PropTypes.string,
  // ratings
  learnScore: PropTypes.number,
  enjoyScore: PropTypes.number,
  // requirements
  preqs: PropTypes.string,
  proh: PropTypes.string,
  updateCurrentUnit: PropTypes.func
}

export default Unit
