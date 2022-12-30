import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "alertifyjs/build/css/alertify.css";
import "antd/dist/antd.min.css";
import {store} from "./store/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./translations";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
