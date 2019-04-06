import {
  SET_QUERY,
  SAVE_QUERY,
  SEARCH_RESULT_OVERVIEW,
  SEARCH_LOADING
} from "../actions/types";

const initialState = {
  hotelQuery: [], // all the hotels that match
  searchQuery: null, // the search arguments
  loading: true
};

// ...state = current state
export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_QUERY:
      return {
        ...state,
        hotelQuery: action.payload.results,
        loading: false
      };
    case SAVE_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        loading: false
      };
    case SEARCH_RESULT_OVERVIEW:
    //falls to default as we want to return the entire state
    default:
      return state;
  }
}
