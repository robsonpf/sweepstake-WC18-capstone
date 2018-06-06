export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';


const BASE_URL = 'http://localhost:5000';

export const userSignup = (firstName, lastName, userName, phone, password, history) => {
  return async (dispatch) => {
    try {
      // save the token to localstorage, that's how we'll know they are logged in if we leave the page
      dispatch({ type: USER_SIGNUP_PENDING })
      // , payload: {user: {"firstName": firstName, "lastName": lastName, "userName": userName, "phone": phone, "password": password}}
      // console.log("payload on userSignup actions ", payload);
      let response = await fetch(`${BASE_URL}/signup`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"firstName": firstName, "lastName": lastName, "userName": userName, "phone": phone, "password": password})
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

export const userLogin = ({ userName, password }, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_PENDING })
      let response = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ userName, password })
      })
      let userObject = await response.json()
      console.log("response: " + userObject)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userObject
      })
      history.push('/profile')
    } catch(err) {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: err
      })
    }
  }
}

// export const userLogout = () => {
//   return async (dispatch) => {
//     dispatch({type: USER_LOGOUT})
//   }
// }
