import { ADD_ITEM, REMOVE_ITEM, INCREMENT_ITEM_COUNT } from "../actions/types";

const initialState = {
  shoppingCart: [], //initial shopping cart is empty
  productIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      for (var i = 0; i < state.shoppingCart.length; i++) {
        if (state.shoppingCart[i] != undefined)
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
        shoppingCart: [...state.shoppingCart, action.payload[0]],
        productIds: [...state.productIds, action.payload[0]._id]
      };

    case REMOVE_ITEM:
      if (action.payload.emptyCart) {
        state.shoppingCart = [];
        state.productIds = [];
      } else {
        for (var i = 0; i < state.productIds.length; i++) {
          if (action.payload.productId == state.productIds[i]) {
            state.shoppingCart[i].count--;
            if (
              state.shoppingCart[i].count == 0 ||
              action.payload.removeAllItems
            ) {
              delete state.shoppingCart[i];
              state.productIds[i] = "Removed Product ID";
            }
          }
        }
      }

      return {
        ...state,
        shoppingCart: state.shoppingCart
      };

    default:
      return state;
  }
}
