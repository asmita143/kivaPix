import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { requestPushNotificationPermission } from "./PushNotification";

const NotificationSetting = () => {
  const { userId, loadingUserData, error } = useUser(); // Use the custom hook
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    console.log("User ID from hook:", userId); // Log userId for debugging
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

    // Handle checkbox change logic
    if (event.target.checked) {
      try {
        await requestPushNotificationPermission(userId);
        setNotificationEnabled(true); // Update state if the permission is granted
      } catch (error) {
        console.error("Error during checkbox change:", error);
      }
    } else {
      setNotificationEnabled(false); // Update state if unchecked
    }
  };

  return (
    <div>
      {/* Make sure the checkbox is only interactive once the user is available */}
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        disabled={loadingUserData || error !== null} // Disable checkbox while loading or if there's an error
        checked={notificationEnabled}
      />
    </div>
  );
};

export default NotificationSetting;
