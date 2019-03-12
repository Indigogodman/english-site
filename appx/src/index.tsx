import configureStore from "./store";

import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { JssProvider } from "react-jss";
import { createGenerateClassName } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <JssProvider generateClassName={createGenerateClassName()}>
        <App />
      </JssProvider>
    </Router>
  </ReduxProvider>,
  document.getElementById("root")
);
