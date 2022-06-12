import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  client:clientReducer,
});

export default rootReducer;