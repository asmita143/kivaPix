import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { User } from "firebase/auth"; 
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

interface UserData {
  uid: string;
  name: string;
  about: string;
  email: string;
  phone: string;
  profilePic?: string;
  notifications: [] ;
  acceptedEvent : [] ;
  interestedEvents : []
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true);
  const [loadingAllUsers, setLoadingAllUsers] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          } else {
            setError("No user data found");
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(`Failed to fetch user data: ${err.message}`);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoadingUserData(false);
        }
      }
    };
    getUserData();
  }, [user]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList: UserData[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ uid: doc.id, ...doc.data() } as UserData);
        });
        setAllUsers(usersList);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to fetch all users: ${err.message}`);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoadingAllUsers(false);
      }
    };
    getAllUsers();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

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
      setUser(userCredential.user);
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        name,
        about,
        email,
        phone,
        createdAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    userId: user ? user.uid : null,
    userData,
    allUsers,
    loadingUserData,
    loadingAllUsers,
    error,
    login,
    register,
    logout,
  };
};

export default useUser;
