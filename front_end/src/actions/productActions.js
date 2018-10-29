import axios from "axios";

import { GET_PRODUCT, PRODUCT_LOADING } from "./types";

// Get product by name
export const getProductByName = productname => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`/api/product/${productname}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: null
      })
    );
};

// Product loading
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};