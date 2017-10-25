import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import SearchGo from '../components/SearchGo'
import { updateQuery, searchIfValid } from '../actions/'

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
        <SearchGo
          onClick={() => this.props.onClick()}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    value: state.search.query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormUpdate: query => {
      dispatch(updateQuery(query))
    },
    onClick: () => {
      dispatch(searchIfValid())
    }
  }
}

const c = connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer)

export default c
