import { ADD_ITEM, REMOVE_ITEM } from "./types";
import axios from "axios";

//do get request at routes/product.js with productDescription object
//productDescription = {description: someString}

// Add Item to Cart
export const addItem = productDescription => dispatch => {
  axios
    .get("/api/product/search", { params: productDescription })
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Remove Item from Cart
// export const removeItem = () => dispatch => {};
