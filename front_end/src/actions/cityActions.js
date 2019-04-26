import axios from "axios";

import { weatherMapAPIKey } from "./apiKeys/keys";

// Type imports
import {
  GET_CITY,
  GET_CITY_WEATHER,
  LOADING_CITY,
  LOADING_CITY_WEATHER,
  CLEAR_CITY,
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
    let cityName = res.data.name.trim().slice(0, res.data.name.trim().indexOf(',')).toLowerCase().replace(/ /g, "+");
    dispatch(fetchCityWeather(cityName));
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

// Clears the city reducer
export let clearCityReducer = () => dispatch => {
  dispatch({
    type: CLEAR_CITY
  })
}