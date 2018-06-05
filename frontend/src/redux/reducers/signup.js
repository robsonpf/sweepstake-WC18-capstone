import {
  USER_SIGNUP_PENDING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED
} from '../actions/signup';

let initialState = {
  isLoading: false,
  showSignupError: false,
  message: ""
};

export default(state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_PENDING:
      return { ...state, isLoading: true }
    case USER_SIGNUP_SUCCESS:
      return { ...state, isLoading: false, showSignupError: false, message: "USER_SIGNUP_SUCCESS" }
    case USER_SIGNUP_FAILED:
      return { ...state, isLoading: false, showSignupError: true, message: action.payload }
    default:
      return state;
  }
}
