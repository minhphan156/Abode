import { ADD_ITEM, REMOVE_ITEM } from "../actions/types";

const initialState = {
  shoppingCart: null //initial shopping cart is empty
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        shoppingCart: action.payload
      };
    case REMOVE_ITEM:
      return {
        ...state
        //delete item from shopping cart
      };
    default:
      return state;
  }
}
