import { combineReducers } from "redux";
import proprietorReducer from "./proprietorReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;