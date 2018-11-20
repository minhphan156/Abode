import { GET_RECIPES, RECIPE_LOADING } from "../actions/types";

const initialState = {
  recipes: [],
  recipe: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECIPE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipe: {},
        loading: false
      };
    default:
      return state;
  }
}
