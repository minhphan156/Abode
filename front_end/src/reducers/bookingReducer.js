import {
  SAVE_BOOKING,
  SET_BOOKING,
  CLEAR_BOOKING,
  CHANGE_RESERVATION
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

    case CHANGE_RESERVATION:
      console.log("Changed");
    default:
      return state;
  }
}
