import { ADD_ITEM, REMOVE_ITEM } from "../actions/types";
import { isUndefined } from "util";

const initialState = {
  shoppingCart: [], //initial shopping cart is empty
  productIds: [],
  isDeleted: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      console.log("====ShoppingCart==" + JSON.stringify(action.payload));

      //clean the data:
      //action.payload contains a product of this format [{Product}]
      //get only the Product JSON object to add it to the shoppingCart array
      var productToAdd = action.payload[0];
      var count = "count";
      var id = productToAdd._id;
      console.log(id);
      var isSimilarProductInCart = false;
      console.log("AAAaAAAa" + JSON.stringify(state.productsIds));
      for (var i = 0; i < state.productIds.length; i++) {
        console.log([state.productIds[i]]);
        if (id == state.productIds[i] && !state.isDeleted[i]) {
          isSimilarProductInCart = true;
          break;
        }
      }
      if (!isSimilarProductInCart) {
        productToAdd[count] = "1";
      } else {
        for (var i = 0; i < state.shoppingCart.length; i++) {
          if (state.shoppingCart[i]._id == id && !state.isDeleted[i]) {
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
          productIds: [...state.productIds, id],
          isDeleted: [...state.isDeleted, false]
        };
      }

    case REMOVE_ITEM:
      console.log("WWWWWWWWWWWWE" + action.payload);
      for (var i = 0; i < state.productIds.length; i++) {
        if (action.payload == state.productIds[i]) {
          state.shoppingCart[i].count--;
          if (state.shoppingCart[i].count == 0) {
            delete state.shoppingCart[i];
            state.productIds[i] = "Removed Product ID";
            state.isDeleted[i] = true;
          }
        }
      }
      console.log(state.productIds);
      console.log(state.shoppingCart);
      return {
        ...state,
        shoppingCart: state.shoppingCart
      };
    default:
      return state;
  }
}
