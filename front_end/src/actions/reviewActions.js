import { PUBLISH_REVIEW } from "./types";

export const submitReview = reviewData => {
  return {
    type: PUBLISH_REVIEW,
    payload: reviewData
  };
};
