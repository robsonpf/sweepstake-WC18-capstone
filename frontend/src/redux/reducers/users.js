import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  POST_BET_PENDING,
  POST_BET_SUCCESS,
  POST_BET_FAILED
} from '../actions/users';

const initialState = {
  isLoading: false,
  showFetchError: false,
  allUsers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return { ...state, isLoading: true }
    case FETCH_USERS_SUCCESS:
      return { ...state, isLoading: false, allUsers: [ ...action.payload ]}
    case FETCH_USERS_FAILED:
      return { ...state, isLoading: false, showFetchError: true }
    case POST_BET_PENDING:
      return { ...state, isLoading: true };
    case POST_BET_SUCCESS:
      const foundUser = state.allUsers.find(user => user.userName === action.payload.userName);
      const index = state.allUsers.indexOf(foundUser);
      console.log(foundUser);
      foundUser.bets = [ ...action.payload.bets ]
      console.log([ ...state.allUsers.slice(0, index), {...foundUser}, ...state.allUsers.slice(index + 1) ]);
      return {   ...state, isLoading: false, allUsers: [ ...state.allUsers.slice(0, index), {...foundUser}, ...state.allUsers.slice(index + 1) ] }
    case POST_BET_FAILED:
      return { ...state, isLoading: true, isValid: false, isValidForm: false, matchId: action.payload}
    default:
      return state;
  }
}
