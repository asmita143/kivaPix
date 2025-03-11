import { getToken } from "firebase/messaging";
import { setDoc, doc } from "firebase/firestore";
import { db, messaging } from "../../../firebase";

// Function to request push notification permission and save token to Firestore
const requestPushNotificationPermission = async (userId: string) => {
  try {
    // Request notification permission from the user
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.error("Notification permission denied.");
      return;
    }

    // Get the push notification token
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY, // Ensure this is set correctly in your environment variables
    });

    if (token) {
      // Save the token to Firestore under the user's document
      await setDoc(
        doc(db, "users", userId),
        { fcmToken: token },
        { merge: true }
      );
      console.log("FCM Token stored successfully:", token);
    }
  } catch (error) {
    console.error("Error getting push notification permission:", error);
  }
};

export { requestPushNotificationPermission };
