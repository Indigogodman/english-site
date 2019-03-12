import * as React from "react";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
    history: any;
  }
}
Window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = [];
Window.__REDUX_DEVTOOLS_EXTENSION__ = [];
