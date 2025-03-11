import React, { useState, useEffect } from "react";
import { db, messaging } from "../../../firebase"; // Import your messaging instance
import { getToken } from "firebase/messaging";
import { updateDoc, doc } from "firebase/firestore"; // Assuming you want to store the token
import useUser from "../hooks/useUser";

const NotificationSetting: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  // Check if permission is already granted or denied
  useEffect(() => {
    if (Notification.permission === "granted") {
      setNotificationsEnabled(true);
    } else {
      setNotificationsEnabled(false);
    }
  }, []);

  const requestNotificationPermission = async () => {
    try {
      setLoading(true); // Start loading state when requesting permission
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
        if (!vapidKey) throw new Error("Missing VAPID key");

        // Get the FCM token
        const token = await getToken(messaging, { vapidKey });
        if (!token) throw new Error("Failed to get token");

        console.log("Push notification token:", token);
        const userId = user?.uid || "";
        // Store the token in Firestore (or your database)

        await updateDoc(doc(db, "users", userId), { fcmToken: token });
        console.log("FCM Token saved in Firestore");

        setNotificationsEnabled(true); // Update the UI state
      } else {
        console.log("Notification permission denied");
        setNotificationsEnabled(false); // Update the UI state
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleToggleChange = () => {
    if (notificationsEnabled) {
      // Disable notifications logic (you can remove the token from your DB or handle it as needed)
      console.log("Notifications disabled.");
      setNotificationsEnabled(false);
      // Optionally, remove the token from Firestore or other actions
    } else {
      // Request permission to enable notifications
      requestNotificationPermission();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white py-6 rounded-lg mx-0 px-0">
      <div className="flex justify-between items-center mb-6">
        <span className="text-m text-black">Push Notifications</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleToggleChange}
            className="toggle-checkbox"
            disabled={loading} // Disable toggle during loading
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <p className="text-black text-xs">
        {notificationsEnabled
          ? "You will receive notifications for new events."
          : "Enable push notifications to stay updated on new events."}
      </p>
    </div>
  );
};

export default NotificationSetting;
