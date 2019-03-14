import { INDIVIDUAL_HOTEL } from "../actions/types";

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
const amenities= ["Casino", "13 restaurants and 3 bars/lounges", "Full-service spa", "Outdoor pool", "Nightclub", "Breakfast available", "Fitness center", "Valet parking", "Business center", "Limo/town car service", "24-hour front desk", "Air conditioning", "Free WiFi in lobby"]
const images = [images1, images2, images3, images4, images5, images6, images7, images8]

const initialState = {
    individualHotelData: {
      name: "Paris Las Vegas Resort & Casino, Las Vegas",
      hotelID: "12345678",
      street: "3655 Las Vegas Blvd S",
      city: "Las Vegas, NV",
      zip: "89109",
      country:"United States of America",
      price: "89",
      star_rates: "4-star Hotel",
      lat:"36.112497",
      alt:"-115.171571",
      tripAdvisorRate: "4.2",
      hotelsRate:"4.9",
      img: images,
      amen: amenities,
      singleAva: true,
      doubleAva: false,
      kingAva: false,
      studioAva: true,
    }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INDIVIDUAL_HOTEL:
      return{
          ...state,
          individualHotelData: action.payload
      };
    default:
      return state;
  }
}
