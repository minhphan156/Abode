// Type imports
import {
  GET_CITY,
  GET_CITY_WEATHER,
  LOADING_CITY,
  LOADING_CITY_WEATHER,
  CLEAR_CITY,
  CITY_ERRORS
} from "../actions/types";

let initialState = {
  cityData: null,
  weatherData: null,
  fetchingCity: false,
  fetchingWeather: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CITY_ERRORS:
      return {
        ...state,
        errors: action.payload,
        fetchingCity: false,
        fetchingWeather: false
      }
    case LOADING_CITY:
      return {
        ...state,
        fetchingCity: true
      };
    case LOADING_CITY_WEATHER:
      return {
        ...state,
        fetchingWeather: true
      };
    case GET_CITY_WEATHER:
      return {
        ...state,
        weatherData: action.payload,
        fetchingWeather: false,
        errors: null
      };
    case GET_CITY:
      return {
        ...state,
        cityData: action.payload,
        fetchingCity: false,
        errors: null
      };
    case CLEAR_CITY:
      return {
        ...state,
        cityData: null,
        weatherData: null,
        fetchingCity: false,
        fetchingWeather: false,
        errors: null,
      }
    default:
      return state;
  }
}
