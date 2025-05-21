import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { VITE_CLERK_PUBLISHABLE_KEY } from "./config/config.ts";
import "./index.css";
import { store } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={VITE_CLERK_PUBLISHABLE_KEY}
    afterSignOutUrl="/login"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ClerkProvider>
);
