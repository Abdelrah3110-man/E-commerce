import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./components/loading/Loading";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Css/components/form.css";
import "./Css/base/media.css";
import "./custom.css";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext.js";
import "react-loading-skeleton/dist/skeleton.css";
import CartChangerContext from "./Context/CartChangerContext.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChangerContext>
          <Router>
            <App />
          </Router>
        </CartChangerContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
