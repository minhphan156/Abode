import { ADD_ITEM, REMOVE_ITEM } from "./types";
import axios from "axios";

//do get request at routes/product.js with productDescription object
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
export const removeItem = productId => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: productId
  });
};
