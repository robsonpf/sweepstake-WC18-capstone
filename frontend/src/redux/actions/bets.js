export const POST_BET_PENDING = 'POST_BET_PENDING';
export const POST_BET_SUCCESS = 'POST_BET_SUCCESS';
export const POST_BET_FAILED = 'POST_BET_FAILED';

const BASE_URL = 'http://localhost:5000';

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
        body: JSON.stringify({ "finalResult" : finalResult, "winnerTeam": winnerTeam, "matchId": matchId  })
      });

      console.log("response", response)
      let bet = await response.json();
      if (response.status === 201) {
        console.log("bet ", bet);
        dispatch({
          type: POST_BET_SUCCESS,
          payload: bet
        });
      } else if (response.status === 400) {
        dispatch({
          type: POST_BET_FAILED,
          payload: bet
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
