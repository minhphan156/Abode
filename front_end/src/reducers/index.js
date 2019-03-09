import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import queryReducer from "./queryReducer";
import profileReducer from "./profileReducer";
import searchResultReducer from "./searchResultReducer";
import landingReducer from "./landingReducer";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  query: queryReducer,
  profile: profileReducer,
  searchResult: searchResultReducer,
  landing: landingReducer
});
