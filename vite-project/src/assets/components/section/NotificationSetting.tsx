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
    <div className="flex flex-col gap-2 px-0 py-4  bg-white">
      <label className="flex items-center gap-2 text-m font-medium text-gray-700">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          disabled={loadingUserData || loading || error !== null}
          checked={notificationEnabled}
          className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-400 disabled:opacity-50"
        />
        Enable Notifications
      </label>

      {loading && (
        <p className="text-blue-500 animate-pulse">Loading... Please wait.</p>
      )}
      {loadingUserData && (
        <p className="text-blue-500 animate-pulse">Loading user data...</p>
      )}
      {error && <p className="text-red-500">{`Error: ${error}`}</p>}
    </div>
  );
};

export default NotificationSetting;
