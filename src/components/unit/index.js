import React, { Component } from 'react'
import UnitButton from './button'

class UnitInformation extends Component {
  constructor () {
    super()
    this.getUnits = this.getUnits.bind(this)
  }

  render () {
    // determine how the inner workings of the unitInformation should be displayed
    let body = null
    if (this.props.isFetching) {
      body = <div>loading...</div>
    } else if (this.props.didInvalidate) {
      body = <div>failed! :(</div>
    } else {
      // unitDetails should always exist if the API request was successful, but this additional check is just protective
      if (this.props.unitDetails) {
        body = (
          <div>
            <h2>{this.props.unitDetails.unitName}</h2>
            <p>{this.props.unitDetails.description}</p>
            <p>
              {
                // detect any units and convert them into buttons, other leave the text untouched
                this.getUnits(this.props.unitDetails.preqs).map(phrase => {
                  return (phrase)
                })
              }
            </p>
          </div>
        )
      }
    }
    // only render unit details if a unit has been selected
    if (this.props.unitCode !== '') {
      return (
        <div className='App-UnitDetails'>
          <h1>{this.props.unitCode}</h1>
          {body}
        </div>
      )
    } else {
      return null
    }
  }

  getUnits (paragraph) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    // units should be of the form 'AAA0001'
    const re = /[A-Z]{3}[0-9]{4}/g
    let out = []
    let start = 0
    let match = re.exec(paragraph)
    while (match) {
      out.push(paragraph.slice(start, match.index))
      out.push(
        <UnitButton
          updateCurrentUnit={this.props.updateCurrentUnit}
          unitCode={paragraph.slice(match.index, match.index + 7)}
        />
      )
      start = match.index + 7
      match = re.exec(paragraph)
    }
    out.push(paragraph.slice(start))
    return out
  }
}

export default UnitInformation
