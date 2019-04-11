import {
  GET_CITY,
  GET_CITY_WEATHER,
  LOADING_CITY,
  LOADING_CITY_WEATHER
} from "../actions/types";

const initialState = {
  cityData: null,
  weatherData: null,
  fetchingCity: false,
  fetchingWeather: false
};

export default function(state = initialState, action) {
  switch (action.type) {
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
        fetchingWeather: false
      };
    case GET_CITY:
      return {
        ...state,
        cityData: action.payload,
        fetchingCity: false
      };
    default:
      return state;
  }
}
