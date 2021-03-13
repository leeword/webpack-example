import React, { Component } from 'react'
import { Input } from 'antd'

import 'antd/dist/antd.css'

class InputLinkage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      val: null,
    };
  }

  onChange = (event) => {
    const val = event.target.value

    this.setState({
      val,
    })
  }

  render() {
    const { val } = this.state;
    return (
      <div style={{ padding: '5px' }}>
        <h1>Input</h1>
        <Input
          value={val}
          onChange={this.onChange}
        />
        <div style={{
          height: '40px',
          color: '#634',
          fontSize: '20px',
        }}>{val}</div>
      </div>
    )
  }
}

export default InputLinkage
