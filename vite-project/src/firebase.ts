
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { onSnapshot, collection, getFirestore, getDocs  } from "firebase/firestore"; // For Firestore database
import { getStorage } from "firebase/storage"; // For Firebase Storage


const firebaseConfig = {
    apiKey: "AIzaSyArZCTSWwTQ1BSGKSHYC4_Sjw3wfEz_tdU",
    authDomain: "kivapix-24d9b.firebaseapp.com",
    projectId: "kivapix-24d9b",
    storageBucket: "kivapix-24d9b.firebasestorage.app",
    messagingSenderId: "591575291149",
    appId: "1:591575291149:web:5a75c53a4811c890308c44",
    measurementId: "G-P6BGYCCDHP"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services you want to use
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, onSnapshot, collection, getDocs };
