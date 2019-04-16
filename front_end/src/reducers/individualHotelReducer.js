import { GET_INDIVIDUAL_HOTEL, CLEAR_DATA} from "../actions/types";

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
    singleAvailability: false,
    doubleAvailability: false,
    kingAvailability: false,
    studioAvailability: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_DATA:
      return {...state,
        individualHotelData:action.payload
      };
    case GET_INDIVIDUAL_HOTEL:
      return {
        ...state,
        individualHotelData: action.payload
      };
    default:
      return state;
  }
}
