import { combineReducers } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { basketReducer } from "./reducers/basketReducer";
import { productReducer } from "./reducers/productReducer";

const rootReducers = combineReducers({
  roots: rootReducer,
  baskets: basketReducer,
  products: productReducer,
});
export default rootReducers;
