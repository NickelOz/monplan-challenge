import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Chip from 'material-ui/Chip'

class UnitRequirements extends Component {
  constructor () {
    super()
    this.extractUnits = this.extractUnits.bind(this)
  }

  render () {
    return (
      <div className='App-unitRequirements'>
        <div className='App-unitPreqs'>
          <h3>Prerequisites</h3>
          <div>
            {
              // detect any units and convert them into buttons, other leave the text untouched
              (this.props.preqs === '') ? 'None' : (
                this.extractUnits(this.props.preqs).map((phrase, index) => {
                  return (<span key={index}>{phrase}</span>)
                })
              )
            }
          </div>
        </div>
        <div className='App-unitProh'>
          <h3>Prohibitions</h3>
          <div>
            {
              // detect any units and convert them into buttons, other leave the text untouched
              (this.props.proh === '') ? 'None' : (
                this.extractUnits(this.props.proh).map((phrase, index) => {
                  return (<span key={index}>{phrase}</span>)
                })
              )
            }
          </div>
        </div>
      </div>
    )
  }

  extractUnits (paragraph) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    // units should be of the form 'AAA0001'
    const re = /[A-Z]{3}[0-9]{4}/g
    let out = []
    let start = 0
    let match = re.exec(paragraph)
    while (match) {
      out.push(paragraph.slice(start, match.index))
      const unitCode = paragraph.slice(match.index, match.index + 7)
      out.push(
        <Chip
          onClick={() => this.props.updateCurrentUnit(unitCode)}
          style={style}
        >
          {unitCode}
        </Chip>

      )
      start = match.index + 7
      match = re.exec(paragraph)
    }
    out.push(paragraph.slice(start))
    return out
  }
}

const style = {
  display: 'inline',
  padding: '2px 0'
}

UnitRequirements.propTypes = {
  preqs: PropTypes.string,
  proh: PropTypes.string,
  updateCurrentUnit: PropTypes.func.isRequired
}

export default UnitRequirements
