import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import Root from './containers/Root'
import configureStore from './store/configureStore'

import './styles/common.css'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

const store = configureStore(history)

render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
)
