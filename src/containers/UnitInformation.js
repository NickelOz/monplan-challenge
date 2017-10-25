import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'
import UnitInformation from '../components/UnitInformation'

class UnitInformationContainer extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (this.props.currentUnit !== nextProps.currentUnit)
  }

  render () {
    return (
      <UnitInformation
        unit={this.props.currentUnit}
      />
    )
  }
}

const mapStateToProps = state => {
  const { validQuery, currentUnit } = state.search
  const defaultUnitState = {
    isFetching: true,
    unitDetails: {}
  }
  const { isFetching, didInvalidate, unitDetails } = state.cachedUnits[currentUnit] || defaultUnitState
  return {
    validQuery: validQuery,
    currentUnit: currentUnit,
    isFetching: isFetching,
    didInvalidate: didInvalidate,
    unitDetails: unitDetails
  }
}

const c = connect(mapStateToProps)(UnitInformationContainer)

export default c
