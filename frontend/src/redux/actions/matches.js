// import decode from "jwt-decode";

export const FETCH_MATCHES_PENDING = 'FETCH_MATCHES_PENDING';
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const FETCH_MATCHES_FAILED = 'FETCH_MATCHES_FAILED';

export const FETCH_TEAMS_PENDING = 'FETCH_TEAMS_PENDING';
export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
export const FETCH_TEAMS_FAILED = 'FETCH_TEAMS_FAILED';

export const FETCH_STADIUMS_PENDING = 'FETCH_STADIUMS_PENDING';
export const FETCH_STADIUMS_SUCCESS = 'FETCH_STADIUMS_SUCCESS';
export const FETCH_STADIUMS_FAILED = 'FETCH_STADIUMS_FAILED';

const BASE_URL = 'http://localhost:5000';

export const matchesByDay = () => {
  return async dispatch => {
    try {
      dispatch({type: FETCH_MATCHES_PENDING});
      let response = await fetch(`${BASE_URL}/groups/matches`,{
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      });
      let match = await response.json();
      dispatch({
        type: FETCH_MATCHES_SUCCESS,
        payload: match
      })
    } catch(err) {
      dispatch({
        type: FETCH_MATCHES_FAILED,
        payload: err
      });
    }
  };
};

export const fetchTeams = () => {
  return async dispatch => {
    try {
      dispatch({type: FETCH_TEAMS_PENDING})
      let response = await fetch(`${BASE_URL}/teams`,{
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      });
      let team = await response.json();
      dispatch({
        type: FETCH_TEAMS_SUCCESS,
        payload: team
      });
    } catch(err) {
      dispatch({
        type: FETCH_TEAMS_FAILED,
        payload: err
      });
    }
  };
};

export const fetchStadiums = () => {
  return async dispatch => {
    try {
      dispatch({type: FETCH_STADIUMS_PENDING});
      let response = await fetch(`${BASE_URL}/stadiums`,{
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
      let stadium = await response.json();
      dispatch({
        type: FETCH_STADIUMS_SUCCESS,
        payload: stadium
      })
    } catch(err) {
      dispatch({
        type: FETCH_STADIUMS_FAILED,
        payload: err
      });
    }
  };
};
