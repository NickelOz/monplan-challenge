import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

class UnitHeader extends Component {
  render () {
    return (
      <AppBar
        title={this.props.unitCode}
        className='App-unitHeader'
        showMenuIconButton={false}
        iconElementRight={
          <div>
            <IconButton
              onClick={() => this.props.reloadCurrentUnit()}
            >
              <FontIcon
                className='material-icons'
                color='#ffffff'
              >
                  refresh
              </FontIcon>
            </IconButton>
            <IconButton
              onClick={() => this.props.clearCurrentUnit()}
            >
              <FontIcon
                className='material-icons'
                color='#ffffff'
                hoverColor='#ff0000'
              >
                  clear
              </FontIcon>
            </IconButton>
          </div>
        }
      />
    )
  }
}

export default UnitHeader
