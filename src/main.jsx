import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeContextProvider from "./components/Theme/ThemeContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const key = "pk_test_Y2FyaW5nLW9yY2EtMjguY2xlcmsuYWNjb3VudHMuZGV2JA";

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={key}>
    <ThemeContextProvider>
      <Router>
        <App />
      </Router>
    </ThemeContextProvider>
  </ClerkProvider>
);
