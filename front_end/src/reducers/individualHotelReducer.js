import { GET_INDIVIDUAL_HOTEL } from "../actions/types";

//const roomOptions = ['single', 'double', 'Queen', 'King']
const amenities = [];
const images = [];

const initialState = {
  individualHotelData: {
    name: "",
    hotelID: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    price: "",
    star_rates: "",
    lat: "",
    alt: "",
    tripAdvisorRate: "",
    hotelsRate: "",
    img: images,
    amenities: amenities,
    singleAva: false,
    doubleAva: false,
    kingAva: false,
    studioAva: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INDIVIDUAL_HOTEL:
      console.log(action.payload);
      return {
        ...state,
        individualHotelData: action.payload
      };
    default:
      return state;
  }
}
