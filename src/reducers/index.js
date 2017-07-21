import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

const user = (state = {}) => state

const rootReducer = combineReducers({
  user,
  router: routerReducer,
  form: formReducer,
})

export default rootReducer
