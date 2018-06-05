import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import login from './login';
import signup from './signup';

export default combineReducers({
  login,
  signup
});
