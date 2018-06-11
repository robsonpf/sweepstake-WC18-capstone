import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED
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
    default:
      return state;
  }
}
