import { GET_CITY, LOADING_CITY } from "./types";
import axios from "axios";

// Fetches city data using the provided city id
export const fetchCityById = cityId => dispatch => {
  setLoadingCity();
  // TODO: Replace code below with axios backend call and dispatch once backend API is implemented.
  dispatch({
    type: GET_CITY,
    payload: cityId
  });
};

// Set city loading to be true while fetching city data
export const setLoadingCity = () => dispatch => {
  dispatch({
    type: LOADING_CITY
  });
};
