import React, { Component } from 'react'

class SearchGo extends Component {
  render () {
    return (
      <button
        className='App-button'
        onClick={() => this.props.onClick()}
      >
        <i className='material-icons'>search</i>
      </button>
    )
  }
}

export default SearchGo
