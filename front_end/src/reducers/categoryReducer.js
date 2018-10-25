import { GET_CATEGORY } from "../actions/types";

const initialState = {
  productCategory: null // initial product query will be empty
};

// ...state = current state
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        productCategory: action.payload
      };
    default:
      return state;
  }
}
