import axios from "axios";

import { GET_LANDING_DATA, SET_LANDING_STATUS, GET_ERRORS } from "./types";

export const readyLanding = () => dispatch => {
  axios
    .get("/api/landing/")
    .then(res => 
      dispatch({
        type: GET_LANDING_DATA,
        payload: res.data
      })
    )
    .catch(err => {
      console.log("ERROR: LANDING DATA NOT RECEIVED");
    })
};

export const setLandingStatus = route => dispatch => {
  dispatch({
      type: SET_LANDING_STATUS,
      payload: route
  });
};
