import { ADD_ITEM, REMOVE_ITEM, INCREMENT_ITEM_COUNT } from "../actions/types";

const initialState = {
  shoppingCart: [] //initial shopping cart is empty
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      for (var i = 0; i < state.shoppingCart.length; i++) {
        if (action.payload[0]._id == state.shoppingCart[i]._id) {
          state.shoppingCart[i].count++;
          return {
            ...state,
            shoppingCart: state.shoppingCart
          };
        }
      }
      action.payload[0]["count"] = "1";
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload[0]]
      };

    case REMOVE_ITEM:
      if (action.payload.productId == "All Product Ids") {
        state.shoppingCart = [];
      } else {
        for (var i = 0; i < state.shoppingCart.length; i++) {
          if (action.payload.productId == state.shoppingCart[i]._id) {
            state.shoppingCart[i].count--;
            if (
              state.shoppingCart[i].count == 0 ||
              action.payload.removeAllItems
            ) {
              state.shoppingCart.splice(i, 1);
            }
            break;
          }
        }
      }
      return {
        ...state,
        shoppingCart: state.shoppingCart
      };

    case INCREMENT_ITEM_COUNT:
      for (let i = 0; i < state.shoppingCart.length; i++) {
        if (action.payload == state.shoppingCart[i]._id) {
          state.shoppingCart[i].count++;
          return {
            ...state,
            shoppingCart: state.shoppingCart
          };
        }
      }

    default:
      return state;
  }
}
