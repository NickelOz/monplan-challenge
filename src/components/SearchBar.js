import React, { Component } from 'react'

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
  }

  render () {
    return (
      <input
        className='App-input'
        type='text'
        value={this.props.value}
        onChange={this.handleFormUpdate}
      />
    )
  }

  handleFormUpdate (e) {
    this.props.onFormUpdate(e.target.value)
  }
}

export default SearchBar
