import * as admin from "firebase-admin";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

admin.initializeApp();

export const sendNewEventNotification = onDocumentCreated(
  "events/{eventId}",
  async (event) => {
    const newEvent = event.data?.data();

    if (!newEvent) return;

    const eventTitle: string = newEvent.title;
    const eventBody: string = newEvent.description;

    // Get FCM tokens from the users collection
    const usersSnapshot = await admin.firestore().collection("users").get();

    const tokens: string[] = [];
    usersSnapshot.forEach((doc) => {
      const user = doc.data();
      if (user.fcmToken) {
        tokens.push(user.fcmToken);
      }
    });

    if (tokens.length > 0) {
      const payload = {
        notification: {
          title: `New Event: ${eventTitle}`,
          body: eventBody,
          icon: "/firebase-logo.png", // Customize the icon path if needed
        },
      };

      try {
        // Send the notification to all collected tokens
        const response = await admin.messaging().sendMulticast({
          tokens,
          notification: payload.notification,
        });
        console.log("Successfully sent message:", response);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }
);
