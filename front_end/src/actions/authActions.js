import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken"; // attach token to header
import jwt_decode from "jwt-decode";

// Register User
// dispatch() is redux function to call for changes in reducer
// we use thunk to delay the calling of dispatch() conditionally instead of using return()

export const registerUser = (userData, history) => dispatch => {
  // passed in history from register component to route to other page (4)
  axios
    .post("/api/users/register", userData) //in package.json we have "proxy": "http://localhost:5000"
    .then(res => history.push("./login")) // action to route to other page (5)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); // set err message from backend to state
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save to localStorage
      const { token, email,firstname,lastname,rewardPoints } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);

      let withEmailDecoded = {
        id: decoded.id,
        iat: decoded.iat,
        exp: decoded.exp,
        email: email,
        firstname: firstname,
        lastname: lastname,
        rewardPoints: rewardPoints
      };

      // Set current user
      dispatch(setCurrentUser(withEmailDecoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCurrentUser = decode => dispatch => {
  axios.get("api/users/current").then(res =>{
    const decoded = {
      id: decode.id,
      iat: decode.iat,
      exp:decode.exp,
      firstname:res.data.firstName,
      lastname:res.data.lastName,
      email:res.data.email,
      rewardPoints:res.data.rewardPoints
    }
    dispatch(setCurrentUser(decoded))
  })
}

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
