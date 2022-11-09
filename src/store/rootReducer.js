import { combineReducers } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { basketReducer } from "./reducers/basketReducer";

const rootReducers = combineReducers({
  roots: rootReducer,
  baskets: basketReducer,
});
export default rootReducers;
