import React, { Component } from 'react'
import { connect } from 'react-redux'
import { performSearch, updateCurrentUnit } from '../actions/'
import Search from '../components/search'

class SearchContainer extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.isFetching !== nextProps.isFetching ||
      this.props.didInvalidate !== nextProps.didInvalidate ||
      this.props.results !== nextProps.results
    )
  }
  render () {
    return (
      <Search
        isFetching={this.props.isFetching}
        didInvalidate={this.props.didInvalidate}
        results={this.props.results}
        performSearch={newQuery => this.props.performSearch(newQuery)}
        updateCurrentUnit={unitCode => this.props.updateCurrentUnit(unitCode)}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.allUnits.isFetching,
    didInvalidate: state.allUnits.didInvalidate,
    results: state.search.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    performSearch: query => {
      dispatch(performSearch(query))
    },
    updateCurrentUnit: unitCode => {
      dispatch(updateCurrentUnit(unitCode))
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(SearchContainer)

export default c
