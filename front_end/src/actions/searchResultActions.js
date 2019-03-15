import { SEARCH_RESULT_OVERVIEW } from "./types";

// get search results from reducer and display
export const displayResultsOverview = () => dispatch => {
  dispatch({
    type: SEARCH_RESULT_OVERVIEW
  });
};
