// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { ModeProvider } from "./contexts/ModeContext.jsx";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModeProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </ModeProvider>
  </React.StrictMode>
);
