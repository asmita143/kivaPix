import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import RouteConfig from "./route"; // Import your RouteConfig
import {
  listenForMessages,
  registerServiceWorker,
  registerServiceWorkerAndRequestPermission,
} from "./assets/components/section/PushNotification";
import useUser from "./assets/components/hooks/useUser";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

// Ensure the service worker is registered before using Firebase Messaging
registerServiceWorker();

const App = () => {
  const { userId } = useUser(); // Custom hook to get userId

  useEffect(() => {
    // Check if userId is available before initializing push notifications
    if (userId) {
      console.log("User ID received in App:", userId);

      // Register the service worker and request notification permission
      registerServiceWorkerAndRequestPermission(userId);

      // Start listening for foreground messages
      listenForMessages();
    } else {
      console.log("User ID not available, skipping push notification setup.");
    }
  }, [userId]); // Only trigger effect when userId changes

  return <RouteConfig />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <App /> {/* Wrap your App component */}
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
