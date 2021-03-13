import React, { Component } from 'react'

import img from '$src/assert/demo4.jpg'

class BigImage extends Component {
  render() {
    return (
      <img
        src={img}
        alt="测试demo"
      />
    )
  }
}

export default BigImage
