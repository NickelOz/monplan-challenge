import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import SearchInput from './input'
import SearchResults from './results'

class Search extends Component {
  render () {
    let body
    if (this.props.isFetching) {
      body = (
        <div>
          <div style={style.container}>
            <RefreshIndicator
              status='loading'
              top={0}
              left={0}
              size={100}
              style={style.indicator}
            />
          </div>
          <h1>MUSE is loading, we'll be ready in a moment!</h1>
        </div>
      )
    } else if (this.props.didInvalidate) {
      body = (
        <div>
          <h1>Something went wrong while loading MUSE, please check back later!</h1>
        </div>
      )
    } else {
      body = (
        <div>
          <SearchInput
            revealSearchResultsIfNeeded={() => this.props.revealSearchResultsIfNeeded()}
            performSearch={newQuery => this.props.performSearch(newQuery)}
          />
          {(this.props.areResultsHidden || (this.props.results.length === 0)) ? null : (
            <SearchResults
              results={this.props.results}
              hideSearchResults={() => this.props.hideSearchResults()}
              updateCurrentUnit={unitCode => this.props.updateCurrentUnit(unitCode)}
            />
          )}
        </div>
      )
    }
    return (
      <Paper className='App-search'>
        {body}
      </Paper>
    )
  }
}

const style = {
  container: {
    display: 'inline-block'
  },
  indicator: {
    position: 'relative'
  }
}

Search.propTypes = {
  // display state
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  areResultsHidden: PropTypes.bool.isRequired,
  // input
  performSearch: PropTypes.func.isRequired,
  revealSearchResultsIfNeeded: PropTypes.func.isRequired,
  // results
  results: PropTypes.array,
  updateCurrentUnit: PropTypes.func.isRequired,
  hideSearchResults: PropTypes.func.isRequired
}

export default Search
