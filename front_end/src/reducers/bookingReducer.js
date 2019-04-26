import {
  SAVE_BOOKING,
  SET_BOOKING,
  CLEAR_BOOKING,
  CHANGE_RESERVATION,
  CANCEL_RESERVATION
} from "../actions/types";

const initialState = {
  tempBookingData: null,
  bookingConfirmationData: {
    // bookingID:"111111",
    // hotelName: 'hotelName',
    // nightlyRate:123,
    // hotelAddress:'3 Circle Star Way, San Carlos, CA, 94070, United States of America',
    // hotelImg:hotelImg,
    // destinationName:destinationName,
    // destinationImg:destinationImg,
    // checkIn:doc.check_in_date,
    // checkOut:doc.check_out_date,
    // numRooms:doc.numOfRoom,
    // roomType:doc.typeOfRoom,
    // Firstname:firstname,
    // Lastname:lastname,
    // email:email,
    // subtotal:subtotal,
    // discounts:discount,
    // rewardPointsUsed:rewardPointsUsed,
    // rewardPointsEarned:rewardPointsEarned,
    // rewardDiscount:rewardDiscount,
    // reservedDate:doc.reservedDate,
    // numberOfNights:req.body.numberOfNights,
    // total:req.body.total,
    // taxesAndFees:req.body.taxesAndFees,
    // rewardDiscount:req.body.rewardPointsUsed,
    // code:200
  }
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
    case CANCEL_RESERVATION:
    default:
      return state;
  }
}
