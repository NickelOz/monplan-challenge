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
  height: '80px'
}

const titleStyle = {
  boxSizing: 'border-box',
  height: '100%',
  padding: '15px 0'
}

export default Header
