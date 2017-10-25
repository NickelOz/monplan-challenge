import React, { Component } from 'react'

class SearchBar extends Component {
  render () {
    return (
      <input
        className='App-input'
        type='text'
        value={this.props.value}
        onChange={e => { this.props.onFormUpdate(e.target.value) }}
      />
    )
  }
}

export default SearchBar
