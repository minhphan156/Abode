import { SEARCH_RESULT_OVERVIEW } from "./types";

export const displayResultsOverview = () => dispatch => {
  dispatch({
    type: SEARCH_RESULT_OVERVIEW
  });
};
