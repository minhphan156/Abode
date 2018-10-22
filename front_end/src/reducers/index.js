import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import productReducer from "./productReducer";

// authReducer = { new initialState }
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  product: productReducer
});
