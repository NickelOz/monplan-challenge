import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'

class SearchResultList extends Component {
  render () {
    return (
      <div className='App-results'>
        <List>
          {
            this.props.results.map((result, index) => {
              if (index < 5) {
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
        {
          // this.props.results.map((result, index) => {
          //   if (index < 5) {
          //     return (
          //       <button
          //         className='App-button'
          //         onClick={() => this.props.onResultButtonClick(result.unitCode)}
          //       >
          //         <h1>{result.unitCode}</h1>
          //         <h2>{result.unitName}</h2>
          //       </button>
          //     )
          //   } else {
          //     return null
          //   }
          // })
        }
      </div>
    )
  }
}

const style = {
  fontWeight: '600'
}

export default SearchResultList
