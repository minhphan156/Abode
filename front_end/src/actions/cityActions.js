import {
  GET_CITY,
  GET_CITY_WEATHER,
  LOADING_CITY,
  LOADING_CITY_WEATHER
} from "./types";
import axios from "axios";

// Fetches city data using the provided city id
export let fetchCityById = cityId => dispatch => {
  setLoadingCity();
  // TODO: Replace code below with axios backend call and dispatch once backend API is implemented and then edit the commented line.
  dispatch({
    type: GET_CITY,
    payload: null
  });
  // fetchCityWeather();
};

// Fetches weather data for the city using the provided city information
let fetchCityWeather = city => dispatch => {
  setCityWeatherLoading();
  // TODO: Replace code below with weather api axios call once registered.
  dispatch({
    type: GET_CITY_WEATHER,
    payload: null
  });
};

// Set city loading to be true while fetching city data
let setLoadingCity = () => dispatch => {
  dispatch({
    type: LOADING_CITY
  });
};

// Set fetchingWeather to true while fetching city weather data
let setCityWeatherLoading = () => dispatch => {
  dispatch({
    type: LOADING_CITY_WEATHER
  });
};
