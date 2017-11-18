import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/search/input'
import SearchResults from '../components/search/results'
import { performSearch, updateCurrentUnit } from '../actions/'

class SearchBarContainer extends Component {
  render () {
    return (
      <div className='App-search'>
        <SearchInput
          value={this.props.value}
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
    value: state.search.query,
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
