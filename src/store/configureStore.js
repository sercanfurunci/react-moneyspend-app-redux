import { legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer";

export default function configureStore() {
  return createStore(rootReducer);
}
