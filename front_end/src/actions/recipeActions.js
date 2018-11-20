import axios from "axios";

import { ADD_RECIPE, GET_RECIPE, RECIPE_LOADING, GET_ERRORS } from "./types";

// Get recipe by name
export const getRecipeByName = recipename => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get(`/api/recipes/${recipename}`)
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
    .post("/api/recipes/create", recipeData)
    .then(res => history.push("/BrowseRecipe"))
    .catch(err => console.log("error in recipe actions"));
};

// Recipe loading
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};
