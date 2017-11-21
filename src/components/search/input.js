import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'

class SearchInput extends Component {
  render () {
    return (
      <TextField
        hintText='Tell me about...'
        onChange={(object, newValue) => {
          this.props.performSearch(newValue)
          this.props.revealSearchResultsIfNeeded()
        }}
        style={style}
      />
    )
  }
}

const style = {
  width: '80%',
  fontSize: '24px'
}

SearchInput.propTypes = {
  performSearch: PropTypes.func.isRequired,
  revealSearchResultsIfNeeded: PropTypes.func.isRequired,
}

export default SearchInput
