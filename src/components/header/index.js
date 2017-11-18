import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import logo from './logo.svg'

class Header extends Component {
  render () {
    return (
      <AppBar
        title={<img src={logo} className='App-logo' alt='logo' />}
        showMenuIconButton={false}
        style={style}
        titleStyle={titleStyle}
      />
    )
  }
}

const style = {
  height: '64px'
}

const titleStyle = {
  boxSizing: 'border-box',
  padding: '16px 0',
  height: '100%',
  lineHeight: '32px'
}

export default Header
