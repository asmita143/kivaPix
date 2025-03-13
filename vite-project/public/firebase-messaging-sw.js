// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with the latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyArZCTSWwTQ1BSGKSHYC4_Sjw3wfEz_tdU",
  authDomain: "kivapix-24d9b.firebaseapp.com",
  databaseURL: "https://kivapix-24d9b.firebaseio.com",
  projectId: "kivapix-24d9b",
  storageBucket: "kivapix-24d9b.appspot.com",
  messagingSenderId: "591575291149",
  appId: "1:591575291149:web:5a75c53a4811c890308c44",
  measurementId: "G-P6BGYCCDHP",
});

const messaging = firebase.messaging();

// Set up background message handler
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  // Customize the notification as needed
  const notificationTitle = "Discover new event";
  const notificationOptions = {
    body: payload.notification.body,
    icon:
      payload.notification.icon ||
      "https://firebasestorage.googleapis.com/v0/b/kivapix-24d9b.firebasestorage.app/o/icons%2Ficon_kivapix.png?alt=media&token=4a44b2b8-5782-48f1-9212-a8b916acfd0d",
  };

  console.log("Displaying notification with title:", notificationTitle);
  console.log("Notification body:", payload.notification.body);

  // Display the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle foreground messages (optional, if you want to handle messages when the app is in the foreground)
messaging.onMessage((payload) => {
  console.log("Received foreground message", payload);

  const notificationTitle = "Discover new event";
  const notificationOptions = {
    body: payload.notification.body,
    icon:
      payload.notification.icon ||
      "https://firebasestorage.googleapis.com/v0/b/kivapix-24d9b.firebasestorage.app/o/icons%2Ficon_kivapix.png?alt=media&token=4a44b2b8-5782-48f1-9212-a8b916acfd0d",
  };

  console.log(
    "Displaying foreground notification with title:",
    notificationTitle
  );
  console.log("Notification body:", payload.notification.body);

  // Optionally, show a notification here, or use a custom method to handle foreground messages
  if (Notification.permission === "granted") {
    new Notification(notificationTitle, notificationOptions);
  }
});
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event.notification);

  // Replace with your app's URL or dynamic page
  const url = "http://localhost:5173/home";

  event.notification.close();

  event.waitUntil(clients.openWindow(url));
});
