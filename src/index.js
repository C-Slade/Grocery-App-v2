import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext.js";
import { DataBaseProvider } from "./context/dbContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <AuthProvider>
        <DataBaseProvider>
          <App />
        </DataBaseProvider>
      </AuthProvider>
    </Router>
  </>
);
