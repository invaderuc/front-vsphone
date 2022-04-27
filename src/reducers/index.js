import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { headerReducer } from "./headerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  header: headerReducer,
});

export default rootReducer;