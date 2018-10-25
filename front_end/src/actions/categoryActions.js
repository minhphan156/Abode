import { GET_CATEGORY } from "./types";
import axios from "axios";
// do post request at routes/product.js with newQuery object
export const submitCategory = newCategory => dispatch => {
  axios
    .get("/api/product/category/", { params: newCategory })
    // if success then res.data will be the product object we looking for
    .then(res => {
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
