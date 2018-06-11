import decode from 'jwt-decode';
import {
  USER_SIGNUP_PENDING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_SUCCESS,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_FAILED
} from '../actions/auth';

// check if there's a token in local localstorage
// if there is, then add the user's info to the initial state

let getInitialState = (payload) => {
  let jwt_payload = decode(payload);
  console.log(jwt_payload);
  let initialState = {
    isLoading: false,
    showSignupError: false,
    message: "",
    user: jwt_payload,
    loggedIn: true
  };
  return initialState;
};

let initialState = {
  isLoading: false,
  showSignupError: false,
  loggedIn: false,
  message: ""
};

// export default(state = getInitialState(), action) => {
export default ( state = initialState, action ) => {
  switch (action.type) {
    case USER_SIGNUP_PENDING:
      return { ...state, isLoading: true };
    case USER_SIGNUP_SUCCESS:
      return { ...state, isLoading: false, showSignupError: false, message: "USER_SIGNUP_SUCCESS", ...action.payload };
    case USER_SIGNUP_FAILED:
      return { ...state, isLoading: false, showSignupError: true, message: action.payload };
    case USER_LOGIN_PENDING:
      return { ...state, isLoading: true }
    case USER_LOGIN_SUCCESS:
      return { ...state, isLoading: false, loggedIn: true, ...getInitialState(action.payload.access_token) };
    case USER_LOGIN_FAILED:
      return { ...state, isLoading: false, showLoginError: true, ...action.payload };
    case USER_LOGOUT_SUCCESS:
      return {...state, loggedIn: false };
    case FETCH_TOKEN_SUCCESS:
      return { ...state, isLoading: false, loggedIn: true, ...getInitialState(action.payload) };
    case FETCH_TOKEN_FAILED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// same as signup, store the token and update state with the user info
