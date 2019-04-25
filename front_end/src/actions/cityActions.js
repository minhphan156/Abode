import axios from "axios";

import { weatherMapAPIKey } from "./apiKeys/keys";

// Type imports
import {
  GET_CITY,
  GET_CITY_WEATHER,
  LOADING_CITY,
  LOADING_CITY_WEATHER,
  CITY_ERRORS
} from "./types";

// Fetches city data using the provided city id
export let fetchCityById = cityId => dispatch => {
  setLoadingCity();
  axios.get(`/api/cityView/city/${cityId}`)
  .then(res => {
    dispatch({
      type: GET_CITY,
      payload: res.data
    });
    let cityName = res.data.name.slice(0, res.data.name.indexOf(',')).toLowerCase().trim();
    return (cityName => dispatch => {
      dispatch({
        type: LOADING_CITY_WEATHER
      });
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${weatherMapAPIKey}&units=imperial`
        )
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
        });
    });
  })
  .catch(err => {
    dispatch({
      type: CITY_ERRORS,
      payload: err.data
    });
  })
};

// Fetches weather data for the city using the provided city information
let fetchCityWeather = cityName => dispatch => {
  console.log("Fetch city weather is called");
  setCityWeatherLoading();
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${weatherMapAPIKey}&units=imperial`
    )
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
