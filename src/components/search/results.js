import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'

class SearchResultList extends Component {
  render () {
    let body
    if (this.props.results.length > 0) {
      body = (
        <List>
          {
            this.props.results.map((result, index) => {
              if (index < 10) {
                return (
                  <ListItem
                    primaryText={result.unitCode}
                    secondaryText={result.unitName}
                    onClick={() => this.props.updateCurrentUnit(result.unitCode)}
                    style={style}
                  />
                )
              } else {
                return null
              }
            })
          }
        </List>
      )
    } else {
      body = null
    }
    return (
      <div className='App-results'>
        {body}
      </div>
    )
  }
}

const style = {
  fontWeight: '600'
}

export default SearchResultList
