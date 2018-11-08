import axios from "axios";

import { ADD_RECIPE, GET_RECIPE, RECIPE_LOADING, GET_ERRORS } from "./types";

// Get recipe by name
export const getRecipeByName = recipename => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get(`/api/recipe/${recipename}`)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPE,
        payload: null
      })
    );
};

// Add Recipe
export const addRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/api/recipe", recipeData)
    .then(res =>
      dispatch({
        type: ADD_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Recipe loading
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};
