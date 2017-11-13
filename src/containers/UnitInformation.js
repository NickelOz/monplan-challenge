import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'
import UnitInformation from '../components/unit/'
import { fetchUnitDetailsIfNeeded } from '../actions'

class UnitInformationContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.unitCode !== nextProps.unitCode) {
      this.props.fetchUnitDetailsIfNeeded(nextProps.unitCode)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.unitCode !== nextProps.unitCode ||
      this.props.isFetching !== nextProps.isFetching ||
      this.props.didInvalidate !== nextProps.didInvalidate
    )
  }

  render () {
    return (
      <UnitInformation
        unitCode={this.props.unitCode}
        isFetching={this.props.isFetching}
        didInvalidate={this.props.didInvalidate}
        unitDetails={this.props.unitDetails}
      />
    )
  }
}

const defaultUnitState = {
  isFetching: true,
  didInvalidate: false,
  unitDetails: {}
}

const mapStateToProps = state => {
  const unitCode = state.currentUnit
  const { isFetching, didInvalidate, unitDetails } = state.cachedUnits[unitCode] || defaultUnitState
  return {
    unitCode: unitCode,
    isFetching: isFetching,
    didInvalidate: didInvalidate,
    unitDetails: unitDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUnitDetailsIfNeeded: unitCode => {
      dispatch(fetchUnitDetailsIfNeeded(unitCode))
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(UnitInformationContainer)

export default c
