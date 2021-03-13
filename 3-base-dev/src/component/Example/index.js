import React, { useState } from 'react'

import alarmBell from '$src/assert/alarm_bell_hover.png'
import './index.scss'

function Example() {
  const [val, setVal] = useState(0)

  return (
    <>
      <div className="bell-clicked-count">
        点击铃铛: {val}
      </div>
      <img
        src={alarmBell}
        className="alarm-bell-img"
        alt="铃铛"
        onClick={() => setVal((prevVal) => prevVal + 1)}
      />
    </>
  )
}

export default Example
