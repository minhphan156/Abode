import axios from "axios";

import {
  GET_PROFILE,
  GET_ERRORS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_HISTORY
} from "./types";

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
  // dispatch(setProfileLoading());
  // axios
  //   .get("/api/profile/history")
  //   .then(res =>
  //     dispatch({
  //       type: GET_HISTORY,
  //       payload: res.data
  //     })
  //   )
  //   .catch(err =>
  //     dispatch({
  //       type: GET_HISTORY,
  //       payload: {}
  //     })
  //   );
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
