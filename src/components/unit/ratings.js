import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LinearProgress from 'material-ui/LinearProgress'

class UnitRatings extends Component {
  render () {
    return (
      <div className='App-unitRatings '>
        <h3>Other students say...</h3>
        <div>
          <h4>LEARN</h4>
          <LinearProgress
            mode='determinate'
            value={this.props.learnScore}
            max={5}
            style={style}
          />
        </div>
        <div>
          <h4>LOVE</h4>
          <LinearProgress
            mode='determinate'
            value={this.props.enjoyScore}
            max={5}
            style={style}
          />
        </div>
      </div>
    )
  }
}

const style = {
  height: '16px'
}

UnitRatings.propTypes = {
  learnScore = PropTypes.number.isRequired,
  enjoyScore = PropTypes.number.isRequired
}

export default UnitRatings
