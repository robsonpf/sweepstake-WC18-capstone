import decode from "jwt-decode";

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILED = 'FETCH_TOKEN_FAILED';

const BASE_URL = 'http://localhost:5000';

export const userSignup = (firstName, lastName, userName,
   phone, password, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_PENDING });
      let response = await fetch(`${BASE_URL}/signup`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"firstName": firstName,
          "lastName": lastName, "userName": userName,
          "phone": phone,  "password": password, "bets": [],
          "roles": ['User'], "points": null

        })
      });
      let isSignedup = await response.json();
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: isSignedup
      });
      console.log('history ===>', history);
      history.push("/login", isSignedup);
    } catch(err) {
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload: err
      });
    };
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
      let userObject = await response.json();
      console.log("response: " + userObject)
      localStorage.setItem("jwt_payload", userObject.access_token)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userObject
      })
      history.push('/profile', userObject)
    } catch(err) {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: err
      });
    }
  };
};

export const fetchToken = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt_payload")
      if (!token) {
        dispatch({
          type: FETCH_TOKEN_FAILED,
          payload: "Fetch token failed!"
        })
        localStorage.removeItem("jwt_payload");
        return null;
      }
      const { exp } = decode(token);
      if (exp * 1000 < Date.now()) {
        dispatch({
          type: FETCH_TOKEN_FAILED,
          payload: "Token expired!"
        })
        localStorage.removeItem("jwt_payload");
      } else {
        dispatch({
          type: FETCH_TOKEN_SUCCESS,
          payload: token
        })
      }
    } catch (err) {
      dispatch({
        type: FETCH_TOKEN_FAILED,
        payload: err
      });
    }
  };
};

export const userLogout = (history) => {
  return async (dispatch) => {
    localStorage.removeItem("jwt_payload");
    dispatch({type: USER_LOGOUT_SUCCESS});
    history.push('/login')
  };
};
