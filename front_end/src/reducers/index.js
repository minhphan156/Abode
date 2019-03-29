import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import queryReducer from "./queryReducer";
import profileReducer from "./profileReducer";
import searchResultReducer from "./searchResultReducer";
import landingReducer from "./landingReducer";
import individualHotelReducer from "./individualHotelReducer";
import roomSelectionReducer from "./roomSelectionReducer";
import paymentReducers from "./paymentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  query: queryReducer,
  profile: profileReducer,
  searchResult: searchResultReducer,
  landing: landingReducer,
  individualHotelData: individualHotelReducer,
  roomSelection: roomSelectionReducer,
  paymentReducers: paymentReducers
});
