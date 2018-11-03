import { ADD_ITEM, REMOVE_ITEM, INCREMENT_ITEM_COUNT } from "../actions/types";

const initialState = {
  shoppingCart: [] //initial shopping cart is empty
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      //If there are already products in cart array, enter for loop
      for (var i = 0; i < state.shoppingCart.length; i++) {
        //If there is an existing occurrence of this product being processed in cart
        if (action.payload[0]._id == state.shoppingCart[i]._id) {
          state.shoppingCart[i].count++;
          return {
            ...state,
            shoppingCart: state.shoppingCart
          };
        }
      }
      //If cart array empty OR there is NO occurrence of this product being
      //processed, then this code gets executed
      action.payload[0]["count"] = "1"; //Product object gets field count set to 1
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload[0]]
      };

    case REMOVE_ITEM:
      if (action.payload.productId == "Remove All Items In Cart") {
        //delete products in shopping cart
        state.shoppingCart = [];
      } else {
        for (var i = 0; i < state.shoppingCart.length; i++) {
          if (action.payload.productId == state.shoppingCart[i]._id) {
            //delete only one occurrence of product being processed
            state.shoppingCart[i].count--;
            //If after deletion, count is 0, OR deleting of all occurrences
            //of product being processed is requested, then remove Product object from cart
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
      //More efficient implementation of incrementing item count as corresponding
      //cart action function does not call back end, before sending payload INCREMENT_ITEM_COUNT
      //to cart reducer
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
