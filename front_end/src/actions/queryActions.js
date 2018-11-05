import { SET_QUERY } from "./types";
import axios from "axios";
// do get request at routes/product.js with newQuery object
export const submitQuery = newQuery => dispatch => {
  axios
    .get("/api/product/search/", { params: newQuery })
    // /api/product/search/?description=searchString
    // if success then res.data will be the product object we looking for
    .then(res => {
      console.log("query product json====" + JSON.stringify(res.data));
      dispatch({
        type: SET_QUERY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
