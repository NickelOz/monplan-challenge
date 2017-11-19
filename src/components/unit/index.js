import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Chip from 'material-ui/Chip'
import Divider from 'material-ui/Divider'
import RefreshIndicator from 'material-ui/RefreshIndicator'

class Unit extends Component {
  constructor () {
    super()
    this.getUnits = this.getUnits.bind(this)
  }

  render () {
    // determine how the inner workings of the unit should be displayed
    let body = null
    if (this.props.isFetching) {
      body = (
        <div className='App-unitBody'>
          <div style={style.indicatorContainer}>
            <RefreshIndicator
              status='loading'
              top={0}
              left={0}
              size={100}
              style={style.indicator}
            />
          </div>
          <h3>{`Loading ${this.props.unitCode}`}</h3>
        </div>
      )
    } else if (this.props.didInvalidate) {
      body = (
        <div className='App-unitBody'>
          <h1>{`Could not load unit details for ${this.props.unitCode}`}</h1>
        </div>
      )
    } else {
      // unitDetails should always exist if the API request was successful, but this additional check is just protective
      if (this.props.unitDetails) {
        body = (
          <div className='App-unitBody'>
            <div className='App-unitTitle'>
              <h1>{this.props.unitDetails.unitName}</h1>
              <h2>{this.props.unitDetails.faculty}</h2>
              <h2>
                {this.props.unitDetails.locationAndTime.map((block, index) => {
                  return ((index > 0) ? ', ' : ' ') + block.location
                })}
                {' Campus'}
              </h2>
            </div>
            <Divider />
            <div className='App-unitDesc'>
              <p>{this.props.unitDetails.description}</p>
            </div>
            <Divider />
            <div className='App-unitRatings '>
              <h4>Other students say...</h4>
              <h5>LEARN</h5><p>{this.props.unitDetails.learnScore}</p>
              <h5>LOVE</h5><p>{this.props.unitDetails.enjoyScore}</p>
            </div>
            <Divider />
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
              <div>
                {
                  // detect any units and convert them into buttons, other leave the text untouched
                  this.getUnits(this.props.unitDetails.proh)
                }
              </div>
            </div>
          </div>
        )
      }
    }
    // only render unit details if a unit has been selected
    if (this.props.unitCode !== '') {
      return (
        <Paper
          zDepth={3}
          className='App-unit'
        >
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
          {body}
        </Paper>
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
      const unitCode = paragraph.slice(match.index, match.index + 7)
      out.push(
        <Chip
          onClick={() => this.props.updateCurrentUnit(unitCode)}
          style={style.chip}
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
  indicatorContainer: {
    display: 'inline-block'
  },
  indicator: {
    position: 'relative'
  },
  chip: {
    display: 'inline',
    padding: '2px 0'
  }
}

export default Unit
