import axios from "axios";

import { GET_RECIPES, RECIPE_LOADING, ADD_LIKE, REMOVE_LIKE } from "./types";

// Get all recipes
export const getRecipes = () => dispatch => {
  dispatch(setRecipeLoading);
  axios
    .get("/api/recipes/")
    .then(res =>
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_RECIPES,
        payload: null
      })
    );
};

// Set loading state
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};
