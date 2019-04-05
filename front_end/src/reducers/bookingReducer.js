import { SAVE_BOOKING, SET_BOOKING } from "../actions/types";

const initialState = {
  tempBookingData: null,
  bookingConfirmationData: null
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
    default:
      return state;
  }
}
