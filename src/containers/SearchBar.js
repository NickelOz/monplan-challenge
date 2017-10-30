import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import { updateSearch, updateCurrentUnit } from '../actions/'

class SearchBarContainer extends Component {
  render () {
    return (
      <div
        id='search'
      >
        <SearchInput
          value={this.props.value}
          onFormUpdate={newQuery =>
            this.props.onFormUpdate(newQuery)
          }
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
    onResultClick: unitCode => {
      dispatch(updateCurrentUnit(unitCode))
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer)

export default c
