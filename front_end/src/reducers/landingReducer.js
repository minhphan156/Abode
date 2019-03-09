import { GET_LANDING_DATA } from "../actions/types";

// TODO: Edit initialState once backend implementation is implemented.
const initialState = {
  header: {
    cityName: "String",
    head: "String"
  },
  deals1: {
    name: "String",
    picurl: "String",
    rates: 1,
    price: 1
  },
  deals2: {
    name: "String",
    picurl: "String",
    rates: 1,
    price: 1
  },
  deals3: {
    name: "String",
    picurl: "String",
    rates: 1,
    price: 1
  },
  featureDestination: [
    {
      cityName: "String",
      picurl: "String"
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LANDING_DATA:
      // TODO: Once backend is done, include backend call here!
      return state;
    default:
      return state;
  }
}
