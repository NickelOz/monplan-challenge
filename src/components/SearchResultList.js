import React, { Component } from 'react'
import SearchResultButton from './SearchResultButton'

class SearchResultList extends Component {
  render () {
    return (
      <div
        id='App-results'
      >
        {
          this.props.results.map((result, index) => {
            if (index < 5) {
              return (
                <SearchResultButton
                  onClick={() => this.props.onResultButtonClick(result.unitCode)}
                  unitCode={result.unitCode}
                  unitName={result.unitName}
                />
              )
            } else {
              return null
            }
          })
        }
      </div>
    )
  }
}

export default SearchResultList
