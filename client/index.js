import React from 'react'
import {render} from 'react-dom'
import { HashRouter } from 'react-router-dom'

import App from './components/App'

require('./misc/')

if (typeof window !== 'undefined') {
  render(
    <HashRouter>
      <App id='samordnasok' />
    </HashRouter>,
		document.getElementById('root')
	)
}
