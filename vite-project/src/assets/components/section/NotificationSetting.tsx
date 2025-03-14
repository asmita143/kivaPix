import React, { useEffect, useState } from "react";

import useUser from "../hooks/useUser"; // Custom hook to get user data
import { registerServiceWorkerAndRequestPermission } from "./PushNotification";

const NotificationSetting = () => {
  const { userId, loadingUserData, error } = useUser(); // Use the custom hook to fetch userId
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the notification process

  useEffect(() => {
    if (userId) {
      console.log("User ID from hook:", userId);
    }
  }, [userId]);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Only proceed if userId is available and user is authenticated
    if (!userId) {
      console.error("User ID is undefined or null");
      return;
    }

    console.log("User ID before requesting permission:", userId);

    // Handle checkbox logic: enabling notifications
    if (event.target.checked) {
      setLoading(true); // Start loading
      try {
        await registerServiceWorkerAndRequestPermission(userId); // Pass the userId to the function
        setNotificationEnabled(true); // Update state if permission is granted
        alert("Notification permission granted!");
      } catch (error) {
        console.error("Error during checkbox change:", error);
        alert("Failed to enable notifications.");
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setNotificationEnabled(false); // Update state if unchecked
      alert("Notifications disabled");
    }
  };

  return (
    <div>
      <label>
        Enable Notifications
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          disabled={loadingUserData || loading || error !== null} // Disable if loading or error
          checked={notificationEnabled}
        />
      </label>
      {loading && <p>Loading... Please wait.</p>}
      {loadingUserData && <p>Loading user data...</p>}
      {error && <p style={{ color: "red" }}>{`Error: ${error}`}</p>}
    </div>
  );
};

export default NotificationSetting;
