import { GET_LANDING_DATA, SET_LANDING_STATUS } from "../actions/types";

// TODO: Edit initialState once backend implementation is implemented.
const initialState = {
  header: {
    cityName: "String",
    headImg: "String"
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
  ],
  isInLanding: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LANDING_DATA:
      return {
        ...state, 
        header: action.payload.header, 
        featureDestination: action.payload.featureDestination
      }
    case SET_LANDING_STATUS:
    return {
      ...state,
      isInLanding: action.payload
    };
    default:
      return state;
  }
}
