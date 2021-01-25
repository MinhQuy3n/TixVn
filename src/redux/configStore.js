import { createStore, combineReducers } from "redux";
import Cinema from "./reducers/cinema";
import Film from "./reducers/film";
import Auth from "./reducers/auth";
import CheckOut from "./reducers/checkOut";

//create root reducer
const reducer = combineReducers({
  Cinema,
  Film,
  Auth,
  CheckOut,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
