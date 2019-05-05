import { GET_INDIVIDUAL_HOTEL, CLEAR_DATA } from "./types";
import axios from "axios";

export const getIndividualHotelResult = hotel => dispatch => {
  axios
    .get("/api/hotel/individual", { params: hotel })
    .then(res => {
      var hotelInfo = res.data
      dispatch({
        type: GET_INDIVIDUAL_HOTEL,
        payload: hotelInfo
      });
    })
    .catch(err => console.log(err));
};

export function clearData(){
  const amenities = [];
  const images = [];
  const initialState = {
      name: "",
      hotelID: "",
      street: "",
      city: "",
      zip: "",
      country: "",
      price: "",
      star_rates: "",
      lat: "",
      alt: "",
      tripAdvisorRate: "",
      hotelsRate: "",
      img: images,
      amenities: amenities,
      singleAvailability: false,
      doubleAvailability: false,
      kingAvailability: false,
      studioAvailability: false
    };
  return{
    type: CLEAR_DATA,
    payload:initialState
  }
}