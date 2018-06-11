export const FETCH_USERS_PENDING= "FETCH_USERS_PENDING";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const BASE_URL = 'http://localhost:5000';

export const fetchUsers = () => {
  return async dispatch => {
    try {
      dispatch({type: FETCH_USERS_PENDING});
      let response = await fetch(`${BASE_URL}/users`,{
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      });
      let users = await response.json();
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: users
        })
      } catch(err) {
      dispatch({
        type: FETCH_USERS_FAILED,
        payload: err
      });
    }
  }
}
