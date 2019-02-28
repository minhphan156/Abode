import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // import reducers which is a function
import { devToolsEnhancer } from 'redux-devtools-extension';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  devToolsEnhancer(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
