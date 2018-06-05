import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
}
