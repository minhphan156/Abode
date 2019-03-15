import { GET_INDIVIDUAL_HOTEL } from "./types";
import axios from "axios";

export const getIndividualHotelResult = hotel => dispatch => {
  axios
    .get("/api/hotel/individual", { params: hotel })
    .then(res => {
      dispatch({
        type: GET_INDIVIDUAL_HOTEL,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
