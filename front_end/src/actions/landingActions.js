import { GET_LANDING_DATA, SET_LANDING_STATUS } from "./types";

export const readyLanding = () => {
  return {
    type: GET_LANDING_DATA
  };
};

export const setLandingStatus = route => dispatch => {
  dispatch({
      type: SET_LANDING_STATUS,
      payload: route
  });
};
