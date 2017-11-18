import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

class SearchBar extends Component {
  render () {
    return (
      <TextField
        hintText='Type a unit or keyword here!'
        onChange={(object, newValue) => this.props.performSearch(newValue)}
      />
      // <input
      //   className='App-input'
      //   type='text'
      //   value={this.props.value}
      //   onChange={e => { this.props.onFormUpdate(e.target.value) }}
      // />
    )
  }
}

export default SearchBar
