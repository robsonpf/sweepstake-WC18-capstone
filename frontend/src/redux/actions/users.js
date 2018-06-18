export const FETCH_USERS_PENDING= "FETCH_USERS_PENDING";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

export const POST_BET_PENDING = 'POST_BET_PENDING';
export const POST_BET_SUCCESS = 'POST_BET_SUCCESS';
export const POST_BET_FAILED = 'POST_BET_FAILED';

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

export const postBet = ({ finalResult, winnerTeam, matchId }) => {
  return async dispatch => {
    try {
      const token = localStorage.getItem("jwt_payload")
      console.log("token", token);

      dispatch({type: POST_BET_PENDING});
      let response = await fetch(`${BASE_URL}/bet`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ "finalResult" : finalResult,
        "winnerTeam": winnerTeam, "matchId": matchId  })
      });

      console.log("response", response)
      let user = await response.json();
      if (response.status === 201) {
        user.bets = [ ...user.bets, { finalResult, winnerTeam, matchId } ]
        dispatch({
          type: POST_BET_SUCCESS,
          payload: user
        });
      } else if (response.status === 400) {
        dispatch({
          type: POST_BET_FAILED,
          payload: matchId
        });
      }
    } catch(err) {
      dispatch({
        type: POST_BET_FAILED,
        payload: err
      });
    }
  }
};
