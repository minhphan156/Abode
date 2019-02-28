import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken"; // attach token to header
import jwt_decode from "jwt-decode";

// Register User
// dispatch() is redux function to call for changes in reducer
// we use thunk to delay the calling of dispatch() conditionally instead of using return()

export const registerUser = (userData, history) => dispatch => {
  // passed in history from register component to route to other page (4)
  //==Step 2==
  console.log("==Step 2 at register action==" + JSON.stringify(userData));
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
//==Step 2==
export const loginUser = userData => dispatch => {
  console.log("==Step 2 at loging action==" + JSON.stringify(userData));
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save to localStorage
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

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
