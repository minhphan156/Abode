import { SEARCH_BOOKING_NO_LOGIN } from "../actions/types";
  
  
const initialState = {
    booking:{
        email:"123@gmail.com",
        bookingID:"123456",
        match:true,
        history: [
          {
            img:
              "https://thumbnails.trvl-media.com/G6DYD561zx1K_xvmgckqNQtLGV0=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/480000/476800/476728/bc0ee6ed_z.jpg",
            hotelName: "Paris Las Vegas Hotel and Casino",
            destination: "Las Vegas, NV",
            check_in_date: "3/3/2019",
            check_out_date: "3/5/2019",
            typeOfRoom: "King",
            numOfRoom: 1,
            status: 2,
            changed: false,
            new_check_in_date: null,
            new_check_out_date: null,
            subtotal: 500.0,
            discount: 10
          }  
        ]
    }
    };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_BOOKING_NO_LOGIN:
          console.log(action.payload);
          return {
            ...state,
            booking: action.payload
          };
        default:
          return state;
      }
  }
  