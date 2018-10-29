import { SET_QUERY } from "../actions/types";

const initialState = {
  productQuery: null // initial product query will be empty
};

// ...state = current state
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        productQuery: action.payload
      };
    default:
      return state;
  }
}
