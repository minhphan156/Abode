import {
    GET_PRODUCT,
    PRODUCT_LOADING,
    CLEAR_CURRENT_PRODUCT
  } from "../actions/types";

  const initialState = {
    product: null,
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case PRODUCT_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_PRODUCT:
        return {
          ...state,
          product: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_PRODUCT:
        return {
          ...state,
          product: null
        };
      default:
        return state;
    }
  }