import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREMENT_ITEM_COUNT,
  DISCOUNT,
  ADD_ITEM_HISTORY
} from "../actions/types";

const discountCodes = ["15OFF", "BlackFriday"];
const discountValue = [0.85, 0.9];
const initialState = {
  shoppingCart: [], //initial shopping cart is empty
  discount: 1.0 // initially there is no discount, so it is 1*original price
};

export default function(state = initialState, action) {
  var itemHistoryCount = 0; //default item count in history is 0
  switch (action.type) {
    case ADD_ITEM_HISTORY: //item count in history is set to value > 0 when we add an item from history
      itemHistoryCount = action.itemCount;
    case ADD_ITEM:
      //If there are already products in cart array, enter for loop
      for (var i = 0; i < state.shoppingCart.length; i++) {
        //If there is an existing occurrence of this product being processed in cart
        if (action.payload[0]._id == state.shoppingCart[i]._id) {
          if (itemHistoryCount > 1) {
            //Has to be >1 because of a bug when itemHistoryCount = 1, it treats count as a string and appends to it somehow
            //If we are adding items from history
            state.shoppingCart[i].count += itemHistoryCount;
          } else {
            //If we are adding items from product card or product detail
            state.shoppingCart[i].count++;
          }
          return {
            ...state,
            shoppingCart: state.shoppingCart
          };
        }
      }
      //If cart array empty OR there is NO occurrence of this product being
      //processed, then this code gets executed
      if (itemHistoryCount) {
        //If we are adding items from history
        action.payload[0]["count"] = itemHistoryCount;
      } else {
        //If we are adding items from product card or product detail
        action.payload[0]["count"] = "1"; //Product object gets field count set to 1
      }

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
            if (state.shoppingCart[i].count == 0 || action.payload.removeItem) {
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

    case DISCOUNT:
      for (let i = 0; i < discountCodes.length; i++) {
        if (action.payload.discountCode == discountCodes[i]) {
          state.discount = discountValue[i];
          return {
            ...state,
            shoppingCart: state.shoppingCart,
            discount: state.discount
          };
        }
      }

    default:
      return state;
  }
}
