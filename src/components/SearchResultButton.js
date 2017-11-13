import React, { Component } from 'react'

class SearchResultButton extends Component {
  render () {
    return (
      <button
        className='App-button'
        onClick={() => this.props.onClick()}
      >
        <h1>{this.props.unitCode}</h1>
        <h2>{this.props.unitName}</h2>
      </button>
    )
  }
}

export default SearchResultButton
