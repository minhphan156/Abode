import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import queryReducer from "./queryReducer";
import profileReducer from "./profileReducer";
import landingReducer from "./landingReducer";
import individualHotelReducer from "./individualHotelReducer";
import bookingReducer from "./bookingReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  query: queryReducer,
  profile: profileReducer,
  landing: landingReducer,
  individualHotelData: individualHotelReducer,
  bookingData: bookingReducer,
});
