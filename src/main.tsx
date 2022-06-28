import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AuthContext from "./contexts/Auth";
import SearchContext from "./contexts/Search";
import DarkModeContext from "./contexts/DarkMode";
import NotificationsContext from "./contexts/Notifications";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationsContext>
      <BrowserRouter>
        <AuthContext>
          <DarkModeContext>
            <SearchContext>
              <App />
            </SearchContext>
          </DarkModeContext>
        </AuthContext>
      </BrowserRouter>
    </NotificationsContext>
  </React.StrictMode>
);
