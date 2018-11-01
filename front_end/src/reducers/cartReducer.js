import { ADD_ITEM, REMOVE_ITEM, INCREMENT_ITEM_COUNT } from "../actions/types";

const initialState = {
  shoppingCart: [], //initial shopping cart is empty
  productIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      //clean the data:
      //action.payload contains a product of this format [{Product}]
      //get only the Product JSON object to add it to the shoppingCart array
      var productToAdd = action.payload[0];

      var id = productToAdd._id;
      var isSimilarProductInCart = false;
      for (var i = 0; i < state.productIds.length; i++) {
        console.log([state.productIds[i]]);
        if (state.shoppingCart[i] != undefined && id == state.productIds[i]) {
          isSimilarProductInCart = true;
          break;
        }
      }
      if (!isSimilarProductInCart) {
        productToAdd["count"] = "1";
      } else {
        for (var i = 0; i < state.shoppingCart.length; i++) {
          if (
            state.shoppingCart[i] != undefined &&
            state.shoppingCart[i]._id == id
          ) {
            state.shoppingCart[i].count++;
            break;
          }
        }
      }

      if (isSimilarProductInCart) {
        return {
          ...state,
          shoppingCart: state.shoppingCart
        };
      } else {
        return {
          ...state,
          shoppingCart: [...state.shoppingCart, productToAdd],
          productIds: [...state.productIds, id]
        };
      }

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
