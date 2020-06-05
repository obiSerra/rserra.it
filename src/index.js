import { render } from "react-snapshot";
import React from "react";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
if (path) {
  history.replace(path);
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
