import * as admin from 'firebase-admin';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

admin.initializeApp();

export const sendNewEventNotification = onDocumentCreated(
  'Event/{eventId}', // Path to trigger when a document is created in the 'Event' collection
  async (event) => {
    const eventId = event.params.eventId;
    console.log('New event created with ID:', eventId);

    const newEvent = event.data?.data();
    if (!newEvent) {
      console.error('No event data found.');
      return;
    }

    const eventTitle: string = 'Discover new event!';
    const eventBody: string = newEvent.name || 'Untitled Event';

    console.log(`Event Title: ${eventTitle}, Event Body: ${eventBody}`);

    // Fetch all users' fcmTokens
    const usersSnapshot = await admin.firestore().collection('users').get();
    const tokens: string[] = [];
    console.log(`Fetched tokens:`);

    usersSnapshot.forEach((doc) => {
      const user = doc.data();
      if (user.fcmToken) {
        tokens.push(user.fcmToken);
        console.log(`Added token: ${user.fcmToken}`);
      }
    });

    if (tokens.length > 0) {
      const notificationPayload = {
        notification: {
          title: eventTitle,
          body: eventBody,
        },
        android: {
          notification: {
            icon: 'https://firebasestorage.googleapis.com/v0/b/kivapix-24d9b.firebasestorage.app/o/icons%2Ficon_kivapix.png?alt=media&token=4a44b2b8-5782-48f1-9212-a8b916acfd0d',
          },
        },
        webpush:{notification: {
          title: eventTitle,
          body: eventBody,
          click_action: "https://firebasestorage.googleapis.com/v0/b/kivapix-24d9b.firebasestorage.app/o/icons%2Ficon_kivapix.png?alt=media&token=4a44b2b8-5782-48f1-9212-a8b916acfd0d"
        },
        },
        data:{eventId,click_action:"https://firebasestorage.googleapis.com/v0/b/kivapix-24d9b.firebasestorage.app/o/icons%2Ficon_kivapix.png?alt=media&token=4a44b2b8-5782-48f1-9212-a8b916acfd0d"}
      };

      console.log('Notification Payload to be sent:', JSON.stringify(notificationPayload));

      try {
        // Send notifications to all tokens
        const response = await admin.messaging().sendEachForMulticast({
          tokens, // Array of FCM tokens
          notification: notificationPayload.notification,
          android: notificationPayload.android,
          webpush:notificationPayload.webpush,
          data:notificationPayload.data
        });
        console.log('FCM RESPONSE:',response);
        

        if (response.failureCount > 0) {
          const failedTokens = response.responses
            .map((response, idx) => {
              if (response.error) {
                return {
                  token: tokens[idx],
                  error: response.error.message,
                };
              }
              return null;
            })
            .filter(Boolean);

          // Handle failed tokens (expired tokens or invalid tokens)
          for (const failedToken of failedTokens) {
            if (failedToken) {
              const token = failedToken.token;
              console.log(`Failed token: ${token}, Error: ${failedToken.error}`);

              // Query users collection to find user with this token
              const userDocSnapshot = await admin.firestore()
                .collection('users')
                .where('fcmToken', '==', token)
                .limit(1)
                .get();

              if (!userDocSnapshot.empty) {
                const userDoc = userDocSnapshot.docs[0];
                const userId = userDoc.id; // Get the user's document ID

                // Remove the expired fcmToken from the user's document
                await admin.firestore().collection('users').doc(userId).update({
                  fcmToken: admin.firestore.FieldValue.delete(),
                });
                console.log(`Removed expired token for user: ${userId}`);
              } else {
                console.log(`No user found for token: ${token}`);
              }
            }
          }
        } else {
          console.log('Successfully sent messages to all tokens');
        }
      } catch (error) {
        console.error('Error sending messages:', error);
      }
    } else {
      console.log('No valid FCM tokens found.');
    }
  }
);
