// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
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
  const notificationTitle = "New event uploaded!";
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Display the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
