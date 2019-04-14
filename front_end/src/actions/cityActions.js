import axios from "axios";

// Type imports
import {
  GET_CITY,
  GET_CITY_WEATHER,
  LOADING_CITY,
  LOADING_CITY_WEATHER,
  CITY_ERRORS
} from "./types";

// API key imports
import { weatherMapAPIKey } from "../apiKeys/keys";

// Fetches city data using the provided city id
export let fetchCityById = cityId => dispatch => {
  setLoadingCity();

  // TODO: Uncomment and fill in missing code below once backend API is implemented then remove prototype code
  /*
  axios.get(BACKEND API CODE)
  .then(res => {
    dispatch({
      type: GET_CITY,
      payload: res.data
    });
    fetchCityWeather(res.data.name);
  })
  .catch(err => {
    dispatch({
      type: CITY_ERRORS,
      payload: err.data
    });
  })
  */

  /* Beginning of prototype code */
  dispatch({
    type: GET_CITY,
    payload: null
  })
  /* End of prototype code */
};

// Fetches weather data for the city using the provided city information
// TODO: Remove export once backend is implemented
export let fetchCityWeather = cityName => dispatch => {
  setCityWeatherLoading();
  axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${weatherMapAPIKey}`)
  .then(res => {
    dispatch({
      type: GET_CITY_WEATHER,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch({
      type: CITY_ERRORS,
      payload: err.data
    });
  })
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
