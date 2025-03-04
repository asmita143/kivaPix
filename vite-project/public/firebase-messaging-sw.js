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

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyArZCTSWwTQ1BSGKSHYC4_Sjw3wfEz_tdU",
  authDomain: "kivapix-24d9b.firebaseapp.com",
  projectId: "kivapix-24d9b.firebaseapp.com",
  storageBucket: "kivapix-24d9b.firebasestorage.app",
  messagingSenderId: "591575291149",
  appId: "1:591575291149:web:5a75c53a4811c890308c44",
  measurementId: "G-P6BGYCCDHP",
  vapidKey:
    "BE3g5xrA8X62C_-pzCAuqOgWOHDEVn3jCTRtRKANkd29ROhXc5oO9luiS3BLvqVcrg0m0XQC7fMzEMmpPjhmHyI",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
