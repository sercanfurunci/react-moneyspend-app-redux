import { configureStore } from "@reduxjs/toolkit";
import money from "./money";
import admin from "./admin";
import total from "./total";
import basket from "./basket";
const store = configureStore({
  reducer: {
    money,
    admin,
    total,
    basket,
  },
});

export default store;
