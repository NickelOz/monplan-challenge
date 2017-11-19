import React, { Component } from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import SearchInput from './input'
import SearchResults from './results'

class Search extends Component {
  render () {
    let body
    if (this.props.isFetching) {
      body = (
        <div className='App-search'>
          <div style={style.container}>
            <RefreshIndicator
              status='loading'
              top={0}
              left={0}
              size={100}
              style={style.indicator}
            />
          </div>
          <h3>MUSE is loading, we'll be ready in a moment!</h3>
        </div>
      )
    } else if (this.props.didInvalidate) {
      body = (
        <div className='App-search'>
          <h1>Something went wrong while loading MUSE, please check back later!</h1>
        </div>
      )
    } else {
      body = (
        <div className='App-search'>
          <SearchInput
            performSearch={newQuery => this.props.performSearch(newQuery)}
          />
          <SearchResults
            updateCurrentUnit={unitCode => this.props.updateCurrentUnit(unitCode)}
            results={this.props.results}
          />
        </div>
      )
    }
    return (
      body
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

export default Search
