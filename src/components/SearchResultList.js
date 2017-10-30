import React, { Component } from 'react'
import SearchResultButton from './SearchResultButton'

class SearchResultList extends Component {
  render () {
    console.log(this.props.results)
    return (
      <div
        id='App-results'
      >
        {
          this.props.results.map(result => {
            return (
              <SearchResultButton
                onClick={() => this.props.onResultButtonClick(result.unitCode)}
                unitCode={result.unitCode}
                unitName={result.unitName}
              />
            )
          })
        }
      </div>
    )
  }
}

export default SearchResultList
