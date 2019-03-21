import { SELECT_ROOM } from "../actions/types";

const initialState = {
  room: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_ROOM:
      return action.payload;
    default:
      return state;
  }
}
