import {
  FETCH_MATCHES_PENDING,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILED,
  FETCH_TEAMS_PENDING,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILED,
  FETCH_STADIUMS_PENDING,
  FETCH_STADIUMS_SUCCESS,
  FETCH_STADIUMS_FAILED
} from '../actions/matches';

const initialState = {
  isLoading: false,
  showFetchError: false,
  allMatches: [],
  allTeams: [],
  allStadiums: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MATCHES_PENDING:
      return { ...state, isLoading: true }
    case FETCH_MATCHES_SUCCESS:
      return { ...state, isLoading: false, allMatches: [ ...action.payload ]}
    case FETCH_MATCHES_FAILED:
      return { ...state, isLoading: false, showFetchError: true }
      case FETCH_TEAMS_PENDING:
        return { ...state, isLoading: true }
      case FETCH_TEAMS_SUCCESS:
        return { ...state, isLoading: false, allTeams: [ ...action.payload ]}
      case FETCH_TEAMS_FAILED:
        return { ...state, isLoading: false, showFetchError: true }
      case FETCH_STADIUMS_PENDING:
        return { ...state, isLoading: true }
      case FETCH_STADIUMS_SUCCESS:
        return { ...state, isLoading: false, allStadiums: [ ...action.payload ]}
      case FETCH_STADIUMS_FAILED:
        return { ...state, isLoading: false, showFetchError: true }
    default:
      return state;
  }
}
