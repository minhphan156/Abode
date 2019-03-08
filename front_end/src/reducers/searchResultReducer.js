import { SEARCH_RESULT_OVERVIEW } from "../actions/types";

const initialState = {
  result: [
    {
      name: "Hotel Central park",
      hotelID: String,
      street: String,
      city: "Manhattan, New York",
      price: "$140",
      star_rates: "Excellent 8.9",
      guest_rate: Number,
      img: "./hotel-img.jpg"
    }
  ]
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESULT_OVERVIEW:
      for (let i = 0; i < state.length; i++) {}
    default:
      return state;
  }
}
