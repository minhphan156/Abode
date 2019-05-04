import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILE_INFO,
  GET_ERRORS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_HISTORY,
  BOOKING_NOT_LOGGED_IN_AUTHENTICATED
} from "./types";
import { setCurrentUser } from "./authActions";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    // .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get User's Travel/Booking History
export const getHistory = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/booking/history")
    .then(res =>
      dispatch({
        type: GET_HISTORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const cleanUpNotLoggedInHistoryState = () => dispatch => {
  dispatch({
    type: BOOKING_NOT_LOGGED_IN_AUTHENTICATED,
    payload: false
  });
  dispatch({
    type: GET_ERRORS,
    payload: { guestHistoryError: false }
  });
};
// Get User's Travel/Booking History Not-logged-in
export const getHistoryNotLoggedIn = bookingData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/booking/guest-history", bookingData)
    .then(res => {
      dispatch({
        type: GET_HISTORY,
        payload: res.data
      });

      dispatch({
        type: BOOKING_NOT_LOGGED_IN_AUTHENTICATED,
        payload: true
      });
    })
    .catch(err => {
      console.log("getHistoryNotLoggedIn error");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Get User's Rewards Points
export const getProfileInfo = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: GET_PROFILE_INFO,
        payload: res.data
      });
      dispatch(setCurrentUser(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Account and Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure you want to delete the Account?")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
