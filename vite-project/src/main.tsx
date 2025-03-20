import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./route";
import {
  listenForMessages,
  registerServiceWorker,
  registerServiceWorkerAndRequestPermission,
} from "./assets/components/section/PushNotification";
import useUser from "./assets/components/hooks/useUser";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const App = () => {
  const { userId } = useUser(); // Get the userId from the custom hook

  const isGuest = !userId; // Determine if the user is a guest (no userId)

  useEffect(() => {
    // Register the service worker globally
    registerServiceWorker();

    // Only register notifications for logged-in users (not guests)
    if (userId && !isGuest) {
      console.log("User ID received in App:", userId);

      // Register the service worker and request notification permission
      registerServiceWorkerAndRequestPermission(userId);

      // Start listening for foreground messages
      listenForMessages();
    } else {
      console.log("Guest or no user ID, skipping push notification setup.");
    }
  }, [userId, isGuest]); // Trigger effect when userId changes or guest status updates

  return <RouteConfig />;
};

// Mount the app to the root element
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
