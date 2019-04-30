import {
  SET_CURRENT_USER,
  BOOKING_NOT_LOGGED_IN_AUTHENTICATED
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticatedNotLoggedIn: false,
  isAuthenticated: false,
  user: {}
};

// ...state = current state
// if payload is empty 'isAuthenticated' is false
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case BOOKING_NOT_LOGGED_IN_AUTHENTICATED:
      return {
        ...state,
        isAuthenticatedNotLoggedIn: action.payload
      };
    default:
      return state;
  }
}
