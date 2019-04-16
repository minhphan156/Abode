import {
  SAVE_BOOKING,
  SET_BOOKING,
  CLEAR_BOOKING,
  CANCEL_RESERVATION
} from "../actions/types";

const initialState = {
  tempBookingData: null,
  bookingConfirmationData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKING:
      return {
        ...state,
        bookingConfirmationData: action.payload
      };
    case SAVE_BOOKING:
      return {
        ...state,
        tempBookingData: action.payload
      };
    case CLEAR_BOOKING:
      return { ...state, bookingConfirmationData: {} };
    case CANCEL_RESERVATION:
      console.log("Cancelled");
      console.log(action.payload);
    default:
      return state;
  }
}
