import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

// ...state = current state
// if payload is empty 'isAuthenticated' is false
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      //==Step 3==
      console.log(
        "==Step 3 at register reducer==" + JSON.stringify(action.payload)
      );
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
