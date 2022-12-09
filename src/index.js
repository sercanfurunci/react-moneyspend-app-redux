import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "alertifyjs/build/css/alertify.css";
import "antd/dist/antd.min.css";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { I18nextProvider } from "react-i18next";
import i18n from "./translations";

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>
);
