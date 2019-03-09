import { SEARCH_RESULT_OVERVIEW } from "../actions/types";

const initialState = {
  result: [
    {
      name: "Hotel Central park",
      hotelID: String,
      street: String,
      city: "Manhattan, New York",
      price: "$180",
      star_rates: "4 star",
      guest_rate: "Excellent 8.0",
      img: "./hotel-img.jpg"
    },
    {
      name: "Hayes Mansion",
      hotelID: String,
      street: String,
      city: "San Jose, California",
      price: "$289",
      star_rates: "5 star",
      guest_rate: "Excellent 8.7",
      img: "./hotel-img-1.jpg"
    },
    {
      name: "The Westin San Diego Gaslamp Quarter",
      hotelID: String,
      street: String,
      city: "San Diego, California",
      price: "$190",
      star_rates: "4 star",
      guest_rate: "Excellent 8.9",
      img: "./hotel-img-2.jpg"
    },
    {
      name: "Crowne Plaza Seattle",
      hotelID: String,
      street: String,
      city: "Seattle, Washington",
      price: "$239",
      star_rates: "5 star",
      guest_rate: "Excellent 8.5",
      img: "./hotel-img-3.jpg"
    },
    {
      name: "Super 8 by Wyndham Denver Stapleton",
      hotelID: String,
      street: String,
      city: "Denver, Colorado",
      price: "$70",
      star_rates: "2 star",
      guest_rate: "Fair 6.2",
      img: "./hotel-img-4.jpg"
    },
    {
      name: "Mandalay Bay",
      hotelID: String,
      street: String,
      city: "Las Vegas, Nevada",
      price: "$168",
      star_rates: "4 star",
      guest_rate: "Excellent 8.6",
      img: "./hotel-img-5.jpg"
    },
    {
      name: "Crowne Plaza LA International Airport",
      hotelID: String,
      street: String,
      city: "Los Angeles, California",
      price: "$130",
      star_rates: "3 star",
      guest_rate: "Very Good 8.1",
      img: "./hotel-img-6.jpg"
    },
    {
      name: "Wishes Biscayne Motel",
      hotelID: String,
      street: String,
      city: "Miami, Florida",
      price: "$83",
      star_rates: "1 star",
      guest_rate: "Fair 4.9",
      img: "./hotel-img-7.jpg"
    },
    {
      name: "The Dominick Hotel",
      hotelID: String,
      street: String,
      city: "NYC, New York",
      price: "$375",
      star_rates: "5 star",
      guest_rate: "Excellent 9.0",
      img: "./hotel-img-8.jpg"
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
