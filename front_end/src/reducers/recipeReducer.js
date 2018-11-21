import {
  GET_RECIPES,
  RECIPE_LOADING,
  GET_RECIPE,
  ADD_LIKE,
  REMOVE_LIKE
} from "../actions/types";

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
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    case ADD_LIKE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case REMOVE_LIKE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
