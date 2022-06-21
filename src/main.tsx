import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import SearchContext from "./contexts/Search";
import DarkModeContext from "./contexts/DarkMode"

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeContext>
        <SearchContext>
          <App />
        </SearchContext>
      </DarkModeContext>
    </BrowserRouter>
  </React.StrictMode>
);
