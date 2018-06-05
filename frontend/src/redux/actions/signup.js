export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

const BASE_URL = 'http://localhost:5000';

export const userSignup = (newUser, history) => {
  retyrn async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_PENDING })
      let response = await fetch(`${BASE_URL}/signup`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
      })
      let isSignedup = await response.json()
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: isSignedup
      })
      console.log('history ===>', history);
      history.push("/login", isSignedup)
    } catch(err) {
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload: err
      })
    }
  }
}
