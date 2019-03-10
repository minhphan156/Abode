import { SET_QUERY, SAVE_QUERY } from "../actions/types";

const initialState = {
  hotelQuery: "stuff", // all the hotels that match
  searchQuery: null // the search arguments
};

// ...state = current state
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        hotelQuery: action.payload
      };
    case SAVE_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    default:
      return state;
  }
}
