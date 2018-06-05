import {
  USER_SIGNUP_PENDING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED
} from '../actions/signup';

let initialState = {
  isLoading: false,
  user: {},
  showingSignupError: false
};

export default(state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_PENDING:
      return { ...state, isLoading: true }
    case USER_SIGNUP_SUCCESS:
      return { ...state, isLoading: false }
    case USER_SIGNUP_FAILED:
      return { ...state, isLoading: false, showSignupError: true }
    default:
      return state;
}
