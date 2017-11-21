import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { List, ListItem } from 'material-ui/List'

class SearchResults extends Component {
  render () {
    return (
      <List className='App-results'>
        {
          this.props.results.map((result, index) => {
            if (index < 10) {
              return (
                <ListItem
                  primaryText={result.unitCode}
                  secondaryText={result.unitName}
                  onClick={() => {
                    this.props.updateCurrentUnit(result.unitCode)
                    this.props.hideSearchResults()
                  }}
                  style={style}
                  key={index + 1}
                />
              )
            } else {
              return null
            }
          })
        }
      </List>
    )
  }
}

const style = {
  fontWeight: '600'
}

SearchResults.propTypes = {
  results = PropTypes.array.isRequired,
  updateCurrentUnit = PropTypes.func.isRequired,
  hideSearchResults = PropTypes.func.isRequired}

export default SearchResults
