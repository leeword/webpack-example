import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'

import Example from './component/Example'
import InputLinkage from './component/InputLinkage'
import BigImage from './component/BigImage'
import Date from './component/Date'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Your App is Running!</h1>
        <br />
        <Example />
        <br />
        <InputLinkage />
        <Date />
        <BigImage />
      </div>
    )
  }
}

export default hot(App)
