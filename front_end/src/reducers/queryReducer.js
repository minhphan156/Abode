import {
  SET_QUERY,
  SAVE_QUERY,
  SEARCH_RESULT_OVERVIEW
} from "../actions/types";

const initialState = {
  hotelQuery: [], // all the hotels that match
  searchQuery: null // the search arguments
};

// ...state = current state
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        hotelQuery: action.payload.results
      };
    case SAVE_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    case SEARCH_RESULT_OVERVIEW:
    //falls to default as we want to return the entire state
    default:
      return state;
  }
}
