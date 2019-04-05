import { SAVE_BOOKING } from "../actions/types";

const initialState = {
  bookingId: "123241",
  hotelName: "Hampton Inn San Francisco Downtown/Convention Center",
  hotelAddress: "942 Mission Street San Francisco, CA, 94103, United States",
  hotelImg: "",
  destinationName: "San Francisco",
  destinationImg: null,
  checkIn: "4/2/2019",
  checkOut: "4/6/2019",
  numRooms: 2,
  roomType: "king",
  Firstname: "Minh",
  Lastname: "Phan",
  email: "minh156@gmail.com",
  subtotal: 123,
  discounts: 22,
  hotelImage: "",
  rewardPointsUsed: 100,
  rewardPointsEarned: 1000,
  reservedDate: "3/2/2019"
};

// ...state = current state
export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_BOOKING:
      return {
        ...state,
        bookingData: action.payload
      };
    default:
      return state;
  }
}
