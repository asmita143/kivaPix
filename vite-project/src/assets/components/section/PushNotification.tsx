import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase"; // Adjust path if needed
import {
  setDoc,
  doc,
  updateDoc,
  deleteField,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust path if needed

// Function to register the service worker
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("Service Worker registered:", registration);
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  } else {
    console.log("Service Worker not supported in this browser.");
  }
};

// Function to request push notification permission
export const requestNotificationPermission = async (
  userId: string
): Promise<boolean> => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    return true;
  } else {
    console.log("Notification permission denied.");
    return false;
  }
};

// Function to save FCM token to Firestore
export const saveFCMTokenToFirestore = async (userId: string) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY, // Ensure this is in your environment variables
    });

    if (token) {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const existingToken = userData?.fcmToken;

        if (existingToken && existingToken !== token) {
          // Token has changed, update it
          await updateDoc(userRef, { fcmToken: token });
          console.log("FCM Token updated successfully:", token);
        } else {
          console.log("FCM Token is the same, no need to update.");
        }
      } else {
        // If user document does not exist, create it with the token
        await setDoc(userRef, { fcmToken: token }, { merge: true });
        console.log("FCM Token stored successfully:", token);
      }
    } else {
      console.error("Failed to get FCM token.");
    }
  } catch (error) {
    console.error("Error getting or saving the FCM token:", error);
  }
};

// Function to refresh the FCM token manually (called on user action or app reload)
export const refreshFCMToken = async (userId: string) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY, // Ensure this is in your environment variables
    });

    if (token) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { fcmToken: token });
      console.log("FCM Token refreshed and updated in Firestore:", token);
    } else {
      console.error("Failed to refresh FCM token.");
    }
  } catch (error) {
    console.error("Error refreshing FCM token:", error);
  }
};

// Function to remove invalid FCM token from Firestore
export const removeInvalidToken = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { fcmToken: deleteField() });
    console.log("FCM Token removed from Firestore.");
  } catch (error) {
    console.error("Error removing invalid token from Firestore:", error);
  }
};

// Function to request permission and save token to Firestore
export const requestPermissionAndSaveToken = async (userId: string | null) => {
  if (!userId) {
    console.log("User ID is null, skipping notification registration.");
    return;
  }

  const permissionGranted = await requestNotificationPermission(userId);
  if (permissionGranted) {
    await saveFCMTokenToFirestore(userId);
  }
};

// Function to register service worker and request permission to save the token
export const registerServiceWorkerAndRequestPermission = async (
  userId: string | null
) => {
  if (!userId) {
    console.log("User ID is null, skipping notification registration.");
    return;
  }

  const registration = await registerServiceWorker();
  if (registration) {
    await requestPermissionAndSaveToken(userId);
  }
};

// Listen for foreground push messages
// Listen for foreground push messages
export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);

    // Check if the notification is available in the payload
    const notification = payload.notification;
    if (notification) {
      const { title, body, icon } = notification;

      // Ensure title and body exist before using them
      if (title && body) {
        new Notification(title, {
          body,
          icon,
        });
      } else {
        console.error("Notification title or body is missing in the payload.");
      }
    } else {
      console.error("Notification data is missing in the payload.");
    }
  });
};
