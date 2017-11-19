import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

class SearchBar extends Component {
  render () {
    return (
      <TextField
        hintText='Tell me about...'
        onChange={(object, newValue) => this.props.performSearch(newValue)}
        disabled={this.props.isFetching || this.props.didInvalidate}
        style={style}
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

const style = {
  width: '90%',
  fontSize: '24px'
}

export default SearchBar
