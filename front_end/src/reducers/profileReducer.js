import {
  GET_PROFILE,
  GET_PROFILE_INFO,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_HISTORY,
  PUBLISH_REVIEW
} from "../actions/types";

const initialState = {
  profile: null,
  profile_info: null,
  loading: false,
  history: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILE_INFO:
      return {
        ...state,
        profile_info: action.payload,
        loading: false
      };
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile_info: null,
        history: null
      };
    case PUBLISH_REVIEW:
      for (let i = 0; i < state.history.length; i++) {
        if (action.payload.bookingID === state.history[i].bookingID) {
          state.history[i].starReview = action.payload.starReview;
          state.history[i].comment = action.payload.comment;
          return {
            ...state,
            shoppingCart: state.history
          };
        }
      }

    default:
      return state;
  }
}
