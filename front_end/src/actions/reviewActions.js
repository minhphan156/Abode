import { PUBLISH_REVIEW } from "./types";

export const submitReview = reviewData => {
  // todo: need to call backend endpoint to update star rating and comments
  return {
    type: PUBLISH_REVIEW,
    payload: reviewData
  };
};
