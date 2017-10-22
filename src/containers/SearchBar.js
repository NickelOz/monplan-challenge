import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchBar from '../components/SearchBar'
import { searchTerm } from '../actions/'

class SearchBarContainer extends Component {
  render () {
    return (
      <SearchBar
        value={this.props.value}
        onFormUpdate={newQuery =>
          this.props.onFormUpdate(newQuery)
        }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    value: state.query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormUpdate: query => {
      dispatch(searchTerm(query))
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer)

export default c
