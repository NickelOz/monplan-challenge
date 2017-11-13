import React, { Component } from 'react'

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
                <button
                  className='App-button'
                  onClick={() => this.props.onResultButtonClick(result.unitCode)}
                >
                  <h1>{result.unitCode}</h1>
                  <h2>{result.unitName}</h2>
                </button>
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
