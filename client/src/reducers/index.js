import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const user = (state = {}) => state;

const rootReducer = combineReducers({
  user,
  router: routerReducer
});

export default rootReducer;
