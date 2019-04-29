import { GET_LANDING_DATA, SET_LANDING_STATUS } from "../actions/types";

// TODO: Edit initialState once backend implementation is implemented.
const initialState = {
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
  inspire: "",
  inspireCity: "",
  inspireCityId: "",
  featCities: [],
  isInLanding: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LANDING_DATA:
      return {
        ...state,
        inspire: action.payload.inspire,
        inspireCity: action.payload.inspireCity,
        inspireCityId: action.payload.cityID,
        featCities: action.payload.featCities
      };
    case SET_LANDING_STATUS:
      return {
        ...state,
        isInLanding: action.payload
      };
    default:
      return state;
  }
}
