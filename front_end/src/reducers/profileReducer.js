import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_HISTORY,
  PUBLISH_REVIEW
} from "../actions/types";

const initialState = {
  profile: null,
  loading: false,
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
      discount: 10,
      starReview: 0,
      comment: "",
      bookingID: "123456"
      // MISSING:
      // new_check_in_date: null,
      // new_check_out_date: null,

      // EXTRA:
      // bookingID
      // total
      // rewardPointsUsed
      // rewardPointsEarned
      // reservedDate
    },
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
      discount: 10,
      starReview: 0,
      comment: "",
      bookingID: "1234567"

      // MISSING:
      // new_check_in_date: null,
      // new_check_out_date: null,

      // EXTRA:
      // bookingID
      // total
      // rewardPointsUsed
      // rewardPointsEarned
      // reservedDate
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case PUBLISH_REVIEW:
      for (let i = 0; i < state.history.length; i++) {
        if (action.payload.bookingID === state.history[i].bookingID) {
          state.history[i].starReview = action.payload.starReview;
          state.history[i].comment = action.payload.comment;
          return {
            ...state,
            shoppingCart: state.history
          };
        }
      }

    default:
      return state;
  }
}
