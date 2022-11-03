import { combineReducers } from "redux";
import { rootReducer } from "./reducers/rootReducer";

const rootReducers = combineReducers({
  roots: rootReducer,
});
export default rootReducers;
