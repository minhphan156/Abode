import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_HISTORY
} from "../actions/types";

const initialState = {
  profile: null,
  loading: false,
  history: [
    {
      // MISSING:
      // new_check_in_date: null,
      // new_check_out_date: null,
      // EXTRA:
      // bookingID
      // total
      // rewardPointsUsed
      // rewardPointsEarned
      // reservedDate
    }
  ]
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
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
