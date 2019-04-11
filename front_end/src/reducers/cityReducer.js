import { GET_CITY, LOADING_CITY } from "../actions/types";

const initialState = {
  // TODO: Update initial state once backend is implemented
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_CITY:
      return {
        ...state,
        loading: true
      };
    case GET_CITY:
      return {
        ...state,
        // TODO: Update redux bucket once backend is implemented
        loading: false
      };
    default:
      return state;
  }
}
