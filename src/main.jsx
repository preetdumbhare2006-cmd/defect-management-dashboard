import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,

        style: {
          background: "#111827",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "600",
          padding: "20px 24px",
          borderRadius: "18px",
          minWidth: "420px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        },

        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
    <App />
  </StrictMode>,
);
