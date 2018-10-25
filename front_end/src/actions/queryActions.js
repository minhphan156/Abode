import { SET_QUERY } from "./types";
import axios from "axios";
// 2-do post request at routes/product.js with newQuery object
// newQuery = {description : someString }

export const submitQuery = newQuery => dispatch => {
  axios
    .get("/api/product/search/", { params: newQuery })
    ///api/product/search/?description=searchString
    // 4-if success then res.data will be the product object we looking for
    .then(res => {
      dispatch({
        type: SET_QUERY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
