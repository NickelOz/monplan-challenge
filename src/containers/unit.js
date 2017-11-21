import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'
import Unit from '../components/unit/'
import { fetchUnitDetailsIfNeeded, updateCurrentUnit, reloadCurrentUnit, loadPreviousUnit, clearCurrentUnit } from '../actions'

class UnitContainer extends Component {
  componentDidMount () {
    this.props.fetchUnitDetailsIfNeeded(this.props.unitCode)
  }

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
      <Unit
        unitCode={this.props.unitCode}
        isFetching={this.props.isFetching}
        didInvalidate={this.props.didInvalidate}
        unitDetails={this.props.unitDetails}
        hasPreviousUnit={this.props.hasPreviousUnit}
        updateCurrentUnit={unitCode => this.props.updateCurrentUnit(unitCode)}
        loadPreviousUnit={() => this.props.loadPreviousUnit()}
        reloadCurrentUnit={() => this.props.reloadCurrentUnit()}
        clearCurrentUnit={() => this.props.clearCurrentUnit()}
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
  const unitCode = state.unitHistory.currentUnit
  const { isFetching, didInvalidate, unitDetails } = state.cachedUnits[unitCode] || defaultUnitState
  const hasPreviousUnit = state.unitHistory.hasPreviousUnit
  return {
    unitCode: unitCode,
    isFetching: isFetching,
    didInvalidate: didInvalidate,
    unitDetails: unitDetails,
    hasPreviousUnit: hasPreviousUnit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUnitDetailsIfNeeded: unitCode => {
      dispatch(fetchUnitDetailsIfNeeded(unitCode))
    },
    updateCurrentUnit: unitCode => {
      dispatch(updateCurrentUnit(unitCode))
    },
    loadPreviousUnit: () => {
      dispatch(loadPreviousUnit())
    },
    reloadCurrentUnit: () => {
      dispatch(reloadCurrentUnit())
    },
    clearCurrentUnit: () => {
      dispatch(clearCurrentUnit())
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(UnitContainer)

export default c
