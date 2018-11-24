import axios from "axios";

import {
  GET_RECIPE,
  GET_RECIPES,
  RECIPE_LOADING,
  ADD_LIKE,
  REMOVE_LIKE
} from "./types";

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

// Add a like
export const addLike = id => dispatch => {
  axios
    .post(`/api/recipes/like/${id}`)
    .then(res =>
      dispatch({
        type: ADD_LIKE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ADD_LIKE,
        payload: null
      })
    );
};

// Remove a like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/recipes/unlike/${id}`)
    .then(res =>
      dispatch({
        type: REMOVE_LIKE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: REMOVE_LIKE,
        payload: null
      })
    );
};

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

// Add Recipe
export const addRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/api/recipes/create", recipeData)
    .then(res => history.push("/MyRecipe"))
    .catch(err => console.log("error at recipe action " + err));
};

export const deleteRecipe = (recipeData, history) => dispatch => {
  axios
    .delete("/api/recipes", recipeData)
    .then(res => history.push("/MyRecipe"))
    .catch(err => console.log(`Recipe Error: ${err}`))
}