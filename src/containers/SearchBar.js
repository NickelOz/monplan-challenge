import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/search/input'
import SearchResults from '../components/search/results'
import { updateSearch, updateCurrentUnit } from '../actions/'

class SearchBarContainer extends Component {
  render () {
    return (
      <div
        id='App-search'
      >
        <SearchInput
          value={this.props.value}
          onFormUpdate={newQuery =>
            this.props.onFormUpdate(newQuery)
          }
        />
        <SearchResults
          onResultButtonClick={unitCode => this.props.onResultButtonClick(unitCode)}
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
    onFormUpdate: query => {
      dispatch(updateSearch(query))
    },
    onResultButtonClick: unitCode => {
      dispatch(updateCurrentUnit(unitCode))
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer)

export default c
