import axios from "axios";

import {
  ADD_RECIPE,
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_LOADING,
  GET_ERRORS,
  ADD_LIKE
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
    .post("/api/recipes/create", recipeData)
    .then(res => history.push("/recipe"))
    .catch(err => console.log("error in recipe actions"));
};

// Add a like
export const addLike = id => dispatch => {
  axios
    .post(`api/recipes/like/${id}`)
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

// Set loading state
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};
