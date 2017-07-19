import React from 'react'
import {render} from 'react-dom'

import App from './components/App'

require('./misc/')

if (typeof window !== 'undefined') {
  render(<App />, document.getElementById('root'))
}
