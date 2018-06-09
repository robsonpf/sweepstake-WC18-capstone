import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import matches from './matches';

export default combineReducers({
  auth,
  matches
});
