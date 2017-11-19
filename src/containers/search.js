import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hideSearchResults, revealSearchResults, performSearch, updateCurrentUnit } from '../actions/'
import Search from '../components/search'

class SearchContainer extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.isFetching !== nextProps.isFetching ||
      this.props.didInvalidate !== nextProps.didInvalidate ||
      this.props.results !== nextProps.results ||
      this.props.areResultsHidden !== nextProps.areResultsHidden
    )
  }

  render () {
    return (
      <Search
        isFetching={this.props.isFetching}
        didInvalidate={this.props.didInvalidate}
        results={this.props.results}
        areResultsHidden={this.props.areResultsHidden}
        hideSearchResults={() => this.props.hideSearchResults()}
        revealSearchResults={() => this.props.revealSearchResults()}
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
    results: state.search.results,
    areResultsHidden: state.search.hidden
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideSearchResults: () => {
      dispatch(hideSearchResults())
    },
    revealSearchResults: () => {
      dispatch(revealSearchResults())
    },
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
