import { INDIVIDUAL_HOTEL, GET_INDIVIDUAL_HOTEL } from "../actions/types";

//  sliding image testing purpose
// All images are local, since I have server connection issues
// all image path are hardcoded as the moment
// pending for further development
//
import images1 from "../images/hotelImages/paris-1.jpg";
import images2 from "../images/hotelImages/paris-2.jpg";
import images3 from "../images/hotelImages/paris-3.jpg";
import images4 from "../images/hotelImages/paris-4.jpg";
import images5 from "../images/hotelImages/paris-5.jpg";
import images6 from "../images/hotelImages/paris-6.jpg";
import images7 from "../images/hotelImages/paris-7.jpg";
import images8 from "../images/hotelImages/paris-8.jpg";

//const roomOptions = ['single', 'double', 'Queen', 'King']
const amenities = ["Test"];
const images = [
  images1,
  images2,
  images3,
  images4,
  images5,
  images6,
  images7,
  images8
];

const initialState = {
  individualHotelData: {
    name: "Paris Las Vegas Resort & Casino, Las Vegas",
    hotelID: "12345678",
    street: "3655 Las Vegas Blvd S",
    city: "Las Vegas, NV",
    zip: "89109",
    country: "United States of America",
    price: "89",
    star_rates: "4-star Hotel",
    lat: "37.78",
    alt: "-122.4",
    tripAdvisorRate: "4.2",
    hotelsRate: "4.9",
    img: images,
    amenities: amenities,
    singleAva: true,
    doubleAva: false,
    kingAva: false,
    studioAva: true
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
    // case GET_INDIVIDUAL_HOTEL:
    //   console.log(action.payload);
    //Alex can uncomment it below after he makes changes to his component
    //if not it will crash
    // return{
    //   ...state,
    //   individualHotelData: action.payload
    // }
    default:
      return state;
  }
}
