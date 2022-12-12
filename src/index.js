import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "alertifyjs/build/css/alertify.css";
import "antd/dist/antd.min.css";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { BrowserRouter } from "react-router-dom";
import "./translations";

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
