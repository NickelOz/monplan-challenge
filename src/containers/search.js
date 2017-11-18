import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/search/input'
import SearchResults from '../components/search/results'
import { performSearch, updateCurrentUnit } from '../actions/'

class SearchBarContainer extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.isFetching !== nextProps.isFetching ||
      this.props.didInvalidate !== nextProps.didInvalidate ||
      this.props.results !== nextProps.results
    )
  }
  render () {
    return (
      <div className='App-search'>
        <SearchInput
          isFetching={this.props.isFetching}
          didInvalidate={this.props.didInvalidate}
          performSearch={newQuery => this.props.performSearch(newQuery)}
        />
        <SearchResults
          updateCurrentUnit={unitCode => this.props.updateCurrentUnit(unitCode)}
          results={this.props.results}
        />
      </div>
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

const c = connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer)

export default c
