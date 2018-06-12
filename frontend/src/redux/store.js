import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from 'redux-logger';

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk, logger),
  // Required! Enable Redux DevTools with the monitors you chose
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
