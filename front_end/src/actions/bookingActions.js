import { SET_BOOKING, SAVE_BOOKING } from "./types";
import axios from "axios";

// submit booking to backend so it can be stored in DB and reused in history page
// then receive (res) from backend a confirmation incl all data, or an error
export const submitBooking = (newBooking, history) => dispatch => {
  console.log(history);

  axios
    .post("/api/booking/confirm", newBooking)
    .then(res => {
      // for some reason, history.push is not working... yet :D
      history.push("./confirmation");

      console.log("booking response backend ", res);

      //////HANDLE BOOKING ERROR
      // successs, go to confirmation page
      // error, go to wherever...
      dispatch({
        type: SET_BOOKING,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// temporarily store booking in redux for use in payment page and confirmation page
export const saveBooking = tempBookingInfo => {
  return {
    type: SAVE_BOOKING,
    payload: tempBookingInfo
  };
};
