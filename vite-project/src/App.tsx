import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import RouteConfig from "./route"; // Import RouteConfig (with no Router)
import { useEffect } from "react"; // Import useEffect
import { generateToken } from "./firebase"; // Import generateToken function

const App = () => {
  useEffect(() => {
    // Check if service worker is available
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js") // Ensure the correct path to your service worker
        .then((registration) => {
          console.log("Service Worker registered:", registration);

          // After registration, check notification permission
          if (Notification.permission === "granted") {
            generateToken(); // Request FCM token if permission granted
          } else {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                console.log("Notification permission granted.");
                generateToken(); // Request FCM token after permission is granted
              } else {
                console.log("Notification permission denied.");
              }
            });
          }
        })
        .catch((err) => {
          console.log("Service Worker registration failed:", err);
        });
    }
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <Router>
      <RouteConfig />
    </Router>
  );
};

export default App;
