import { getToken } from "firebase/messaging";
import { setDoc, doc } from "firebase/firestore";
import { db, messaging } from "../../../firebase"; // Ensure the import path is correct

// Function to request push notification permission and save token to Firestore
export const requestPushNotificationPermission = async (userId: string) => {
  try {
    console.log("User ID received:", userId);
    // Check if userId is valid
    if (!userId || typeof userId !== "string" || userId.trim() === "") {
      throw new Error("User ID is invalid or not provided.");
    }

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
      const userRef = doc(db, "users", userId); // Ensure the path is correct

      await setDoc(userRef, { fcmToken: token }, { merge: true });
      console.log("FCM Token stored successfully:", token);
    } else {
      console.error("Failed to get FCM token.");
    }
  } catch (error) {
    console.error(
      "Error getting push notification permission or storing token:",
      error
    );
  }
};
