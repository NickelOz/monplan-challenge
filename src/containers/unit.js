import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'
import Unit from '../components/unit/'
import { fetchUnitDetailsIfNeeded, updateCurrentUnit, reloadCurrentUnit, clearCurrentUnit } from '../actions'

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
        updateCurrentUnit={unitCode => this.props.updateCurrentUnit(unitCode)}
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
    },
    updateCurrentUnit: unitCode => {
      dispatch(updateCurrentUnit(unitCode))
    },
    reloadCurrentUnit: unitCode => {
      dispatch(reloadCurrentUnit(unitCode))
    },
    clearCurrentUnit: () => {
      dispatch(clearCurrentUnit())
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(UnitContainer)

export default c
