import { ADD_ITEM, REMOVE_ITEM, INCREMENT_ITEM_COUNT } from "./types";
import axios from "axios";

//do get request at routes/product.js with productName object
//productName = {name: stringOfProductName}

// Add Item to Cart
export const addItem = productName => dispatch => {
  axios
    .get("/api/product/search", { params: productName })
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Remove Item from Cart
export const removeItem = product => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: product
  });
};

//Increment Item Count of Existing Product in Cart
export const incrementItemCount = product => dispatch => {
  dispatch({
    type: INCREMENT_ITEM_COUNT,
    payload: product
  });
};
