import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import api from '../middleware/api'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const isProd = process.env.NODE_ENV === 'production'
const loggerMiddleware = isProd && createLogger()

const configureStore = history => {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), thunk, api, ...loggerMiddleware),
    ),
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
