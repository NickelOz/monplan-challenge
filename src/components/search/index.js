import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  performSearch,
  updateCurrentUnit
} from '../../actions'

import Paper from 'material-ui/Paper'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import SearchInput from './input'
import SearchResults from './results'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      areResultsHidden: true
    }
  }

  hideResults () {
    this.setState({
      areResultsHidden: true
    })
  }

  revealResults () {
    this.setState({
      areResultsHidden: false
    })
  }

  revealResultsIfNeeded () {
    if (this.state.areResultsHidden === true) {
      this.revealResults()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.isFetching !== nextProps.isFetching ||
      this.props.didInvalidate !== nextProps.didInvalidate ||
      this.props.results !== nextProps.results ||
      this.state.areResultsHidden !== nextState.areResultsHidden
    )
  }

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
            revealSearchResultsIfNeeded={this.revealResultsIfNeeded.bind(this)}
            performSearch={newQuery => this.props.performSearch(newQuery)}
          />
          {(this.state.areResultsHidden || (this.props.results.length === 0)) ? null : (
            <SearchResults
              results={this.props.results}
              hideSearchResults={this.hideResults.bind(this)}
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
  // input
  performSearch: PropTypes.func.isRequired,
  // results
  results: PropTypes.array,
  updateCurrentUnit: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
