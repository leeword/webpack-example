import React from 'react'
import { render } from 'react-dom'

import App from './App'

function createRootElement() {
  const el = document.createElement('div')
  el.id = 'root'

  return el;
}

document.body.appendChild(createRootElement())

render(
  <App />,
  document.getElementById('root')
)
