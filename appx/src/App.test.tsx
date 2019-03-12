import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import configureStore from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { JssProvider } from "react-jss";
import { createGenerateClassName } from "@material-ui/core";
import { Provider as ReduxProvider } from "react-redux";
const store = configureStore();

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ReduxProvider store={store}>
      <Router>
        <JssProvider generateClassName={createGenerateClassName()}>
          <App />
        </JssProvider>
      </Router>
    </ReduxProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
