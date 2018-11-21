import axios from "axios";

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