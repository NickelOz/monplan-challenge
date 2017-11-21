import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
            {
              // only show a 'previous/back button if there is a preceding unit to jump back to
              this.props.hasPreviousUnit && (
              <IconButton
                onClick={() => this.props.loadPreviousUnit()}
              >
                <FontIcon
                  className='material-icons'
                  color='#ffffff'
                >
                  arrow_back
                </FontIcon>
              </IconButton>
              )
            }
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

UnitHeader.propTypes = {
  unitCode: PropTypes.string.isRequired,
  hasPreviousUnit: PropTypes.bool.isRequired,
  loadPreviousUnit: PropTypes.func.isRequired,
  reloadCurrentUnit: PropTypes.func.isRequired,
  clearCurrentUnit: PropTypes.func.isRequired
}

export default UnitHeader
