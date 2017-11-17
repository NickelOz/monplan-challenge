import React, { Component } from 'react'
import UnitButton from './button'
import LoadingAnimation from '../misc/loading'

class UnitInformation extends Component {
  constructor () {
    super()
    this.getUnits = this.getUnits.bind(this)
  }

  render () {
    // determine how the inner workings of the unitInformation should be displayed
    let body = null
    if (this.props.isFetching) {
      body = <LoadingAnimation />
    } else if (this.props.didInvalidate) {
      body = <div>failed! :(</div>
    } else {
      // unitDetails should always exist if the API request was successful, but this additional check is just protective
      if (this.props.unitDetails) {
        body = (
          <div>
            <div className='App-unitHeader'>
              <h1>{this.props.unitCode}</h1>
              <h2>{this.props.unitDetails.unitName}</h2>
              <h3>{this.props.unitDetails.faculty}</h3>
              <h3>
                {this.props.unitDetails.locationAndTime.map((block, index) => {
                  return ((index > 0) ? ', ' : ' ') + block.location
                })}
                {' Campus'}
              </h3>
            </div>
            <div className='App-unitDesc'>
              <p>{this.props.unitDetails.description}</p>
            </div>
            <div className='App-unitRatings '>
              <h4>Other students say...</h4>
              <h5>LEARN</h5><p>{this.props.unitDetails.learnScore}</p>
              <h5>LOVE</h5><p>{this.props.unitDetails.enjoyScore}</p>
            </div>
            <div className='App-unitPreqs'>
              <h5>Prerequisites</h5>
              <p>
                {
                  // detect any units and convert them into buttons, other leave the text untouched
                  this.getUnits(this.props.unitDetails.preqs).map(phrase => {
                    return (phrase)
                  })
                }
              </p>
            </div>
            <div className='App-unitProh'>
              <h5>Prohibitions</h5>
              <p>
                {
                  // detect any units and convert them into buttons, other leave the text untouched
                  this.getUnits(this.props.unitDetails.proh).map(phrase => {
                    return (phrase)
                  })
                }
              </p>
            </div>
          </div>
        )
      }
    }
    // only render unit details if a unit has been selected
    if (this.props.unitCode !== '') {
      return (
        <div className='App-unit'>
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
