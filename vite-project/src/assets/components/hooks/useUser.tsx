import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Role } from "../utils/Role";

interface UserData {
  uid: string;
  name: string;
  about: string;
  email: string;
  phone: string;
  profilePic?: string;
  role: Role;
  notifications: [];
  acceptedEvent: [];
  interestedEvents: [];
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

  const updateUserProfile = async (
    uid: string,
    updatedData: Partial<UserData>
  ) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, updatedData);
      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

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
    phone: string,
    role: Role.Photographer
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
        role,
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

  // Determine if the current user is a guest (no user logged in)
  const isGuest = !user;

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
    updateUserProfile,
    isGuest,
  };
};

export default useUser;
