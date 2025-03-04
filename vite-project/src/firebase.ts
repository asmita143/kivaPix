import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { onSnapshot, collection, getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  vapidKey:import.meta.env.VITE_FIREBASE_VAPID_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const messaging = getMessaging(app);

export const generateToken = async () => {
 const permission = await Notification.requestPermission();
 console.log(permission);
 if(permission === "granted"){const token = await getToken(messaging,{
  vapidKey:"BE3g5xrA8X62C_-pzCAuqOgWOHDEVn3jCTRtRKANkd29ROhXc5oO9luiS3BLvqVcrg0m0XQC7fMzEMmpPjhmHyI",

 })
console.log(token);}

 
};

export { auth, db, storage, onSnapshot, collection, getDoc,doc, updateDoc,messaging, getToken, onMessage };
