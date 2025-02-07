// src/hooks/useUser.ts
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { User } from "firebase/auth"; // Firebase user type for type safety
import { doc, getDoc, setDoc } from "firebase/firestore";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null); // Explicitly typed as User or null
  const [userData, setUserData] = useState<any>(null); // To store user-specific data
  const [loading, setLoading] = useState<boolean>(true); // Loading state for user data
  const [error, setError] = useState<string | null>(null); // Error state for Firestore fetch

  // Listen to auth state changes and update the user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Automatically set the user when logged in or out
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setError("No user data found");
          }
        } catch (err) {
          setError("Failed to fetch user data");
        } finally {
          setLoading(false); // Set loading to false after fetch is done
        }
      }
    };
    getUserData();
  }, [user]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user); // Update user state after successful login
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (
    email: string,
    password: string,
    name: string,
    about: string,
    phone: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user); // Set the newly registered user

      // Store user data in Firestore
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        name: name,
        about: about,
        email: email,
        phone: phone,
        createdAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state on logout
    } catch (error) {
      throw error;
    }
  };

  return { user, userData, loading, error, login, register, logout }; // Return the user state, login, register, and logout functions
};

export default useUser;
