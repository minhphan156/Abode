import { SET_PAYMENT_INFO } from "../actions/types";
import { withRouter } from "react-router-dom";

const initialState = {
  individualHotelData: {
    Firstname: "",
    LastName: "",
    Address1: "",
    Address2: "",
    city: "",
    State: "",
    zip: "",
    country: "",
    NameOnCard: "",
    cardNumber: "",
    expiredDate: "",
    CVV: ""
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PAYMENT_INFO:
      return {
        ...state,
        individualHotelData: action.payload
      };

    default:
      return state;
  }
}
