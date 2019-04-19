import { PUBLISH_REVIEW } from "./types";
import axios from "axios";

export const submitReview = reviewData => dispatch => {
  axios.post("/api/booking/review", reviewData).catch(err => console.log(err));

  return {
    type: PUBLISH_REVIEW,
    payload: reviewData
  };
};
