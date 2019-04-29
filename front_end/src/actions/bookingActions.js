import {
  SET_BOOKING,
  SAVE_BOOKING,
  CLEAR_BOOKING,
  CHANGE_RESERVATION,
  CANCEL_RESERVATION
} from "./types";
import axios from "axios";

// submit booking to backend so it can be stored in DB and reused in history page
// then receive (res) from backend a confirmation incl all data, or an error
export const submitBooking = newBooking => dispatch => {
  axios
    .post("/api/booking/confirm", newBooking)
    .then(res => {
      // if (res.status === 409) {
      //   //either tried to reseve on same date
      //   // or hotel is booked out
      //   window.location = "./";
      // } else if (res.status === 200) {
      //   // keep going, all OK}
      // } else {
      //   // something went horribly wront
      //   window.location = "./";
      // }

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

// Clear booking data
export const clearBooking = () => {
  return {
    type: CLEAR_BOOKING
  };
};

export const changeReservation = booking => dispatch => {
  axios
    .post("/api/booking/changeReservation", booking)
    .then(res => {
      dispatch({
        type: CHANGE_RESERVATION,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const cancelReservation = booking => dispatch => {
  axios
    .post("/api/booking/cancel", booking)
    .then(res => {
      dispatch({
        type: CANCEL_RESERVATION,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
