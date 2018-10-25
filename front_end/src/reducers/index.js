import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import queryReducer from "./queryReducer";
import profileReducer from "./profileReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  query: queryReducer,
  profile: profileReducer,
  category: categoryReducer,
  product: productReducer
});
