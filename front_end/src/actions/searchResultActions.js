import { GET_INDIVIDUAL_HOTEL, CLEAR_DATA } from "./types";
import axios from "axios";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDW-Gy3YtzwfsT2pstjlMU2Q5U4TjRJZp8");

export const getIndividualHotelResult = hotel => dispatch => {
  axios
    .get("/api/hotel/individual", { params: hotel })
    .then(res => {
      var hotelInfo = res.data
      Geocode.fromAddress(hotelInfo.address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          hotelInfo.lat = lat;
          hotelInfo.alt = lng
          dispatch({
            type: GET_INDIVIDUAL_HOTEL,
            payload: hotelInfo
          });
        },
        error => {
          console.error(error);
        }
      );
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