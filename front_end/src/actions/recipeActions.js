import axios from "axios";

import {
  ADD_RECIPE,
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_LOADING,
  GET_ERRORS
} from "./types";

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

// Get a specific recipe by ID
export const getRecipe = id => dispatch => {
  dispatch(setRecipeLoading);
  axios
    .get(`/api/recipes/${id}`)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(res => {
      dispatch({
        type: GET_RECIPE,
        payload: null
      });
    });
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

// Set loading state
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};
