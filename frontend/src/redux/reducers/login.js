import {
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED
} from '../actions/login';

const initialState = {
  isLoading: false,
  loggedIn: false,
  showLoginError: false,
}

export default (state = initialState, { type, payload }) => {
 switch (type) {
   case USER_LOGIN_PENDING:
    return { ...state, isLoading: true }
  case USER_LOGIN_SUCCESS:
    return { ...state, inLoading: false, ...payload }
  case USER_LOGIN_FAILED:
    return { ...state, isLoading: false, showLoginError: true, ...payload }
  default:
  return state;
 }
}
