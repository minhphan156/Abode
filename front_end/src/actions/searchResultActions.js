import { GET_INDIVIDUAL_HOTEL } from "./types";
import axios from "axios";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDW-Gy3YtzwfsT2pstjlMU2Q5U4TjRJZp8");

export const getIndividualHotelResult = hotel => dispatch => {
  axios
    .get("/api/hotel/individual", { params: hotel })
    .then(res => {
      var hotelInfo = res.data
      Geocode.fromAddress(hotelInfo.street + hotelInfo.city).then(
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
