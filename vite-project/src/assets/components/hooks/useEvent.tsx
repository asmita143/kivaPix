import { useEffect, useState } from "react";
import { db, collection } from "../../../firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

interface EventLocation {
  name: string; // The name of the location (e.g., "Leppavaara, Espoo")
  coordinates: {
    lat: number; // Latitude
    lng: number; // Longitude
  };
}

export interface Event {
  imageSrc?: string;
  id?: string;
  name: string;
  date?: Date | null; // ISO string representation of the date
  startTime: string;
  endTime: string;
  description: string;
  location: EventLocation;
  hostFirstName: string;
  hostLastName: string;
  hostPhone: string;
  hostEmail: string;
  hostCountry: string;
  hostStreetAddress: string;
  hostPostalCode: string;
  hostCity: string;
  participants: number;
  contractType: string;
  accepted: boolean
}

const useEvent = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventUploading, setEventUploading] = useState(false);
  const eventRef = collection(db, "Event");

  useEffect(() => {
    const q = query(eventRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Map all documents to an array of Event objects
      const eventsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          date: data.date?.toDate ? data.date.toDate() : null,
          location: data.location || { 
            name: "", 
            coordinates: { lat: 0, lng: 0 } 
          },
        } as Event;
      });
  
      setEvents(eventsData); 
    });
  
    return unsubscribe;
  }, []);

  const addEvent = async (event: Event) => {
    setEventUploading(true);
    try {
      const docRef = await addDoc(eventRef, {
        ...event,
        date: event.date ? Timestamp.fromDate(event.date) : null,
        accepted: false
      });
      setEvents((prevEvents) => [...prevEvents, event]);

      return docRef.id;
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setEventUploading(false);
    }
  };

  const updateInterestedEventsForUser = async (
    userId: string,
    eventId: string,
    add: boolean
  ) => {
    try {
      const userRef = doc(db, "users", userId);
      if (add) {
        await updateDoc(userRef, {
          interestedEvents: arrayUnion(eventId),
        });
      } else {
        await updateDoc(userRef, {
          interestedEvents: arrayRemove(eventId),
        });
      }
    } catch (error) {
      console.error("Error updating interestedEvent field:", error);
    }
  };

  const addNotification = async (eventId: string) => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);

      const updatePromises = usersSnapshot.docs.map(async (userDoc) => {
        const userRef = doc(db, "users", userDoc.id);
        await updateDoc(userRef, {
          notifications: arrayUnion(eventId),
        });
      });

      await Promise.all(updatePromises);

      console.log("Notifications added for all users!");
    } catch (error) {
      console.error("Error updating notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearNotifications = async (userId: string) => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        notifications: [],
      });
      console.log("All notifications cleared!");
    } catch (error) {
      console.error("Error clearing notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptEvent = async (userId: string, eventId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        acceptedEvent: arrayUnion(eventId),
      });
    } catch (error) {
      console.error("Error updating interestedEvent field:", error);
    }
  };

  const updateAcceptedField = async (eventId: string) => {
    try {
      const eventRef = doc(db, "Event", eventId);
      await updateDoc(eventRef, {
        accepted: true,
      });
    } catch (error) {
      console.error("Error updating interestedEvent field:", error);
    }
  };

  const deleteEvent = async (eventId: string) => {
    setLoading(true);
    try {
      const eventDocRef = doc(db, "Event", eventId);
      await deleteDoc(eventDocRef); 
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId)); 
      console.log("Event deleted successfully!", eventId);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    addEvent,
    eventUploading,
    updateInterestedEventsForUser,
    acceptEvent,
    addNotification,
    clearNotifications,
    loading,
    updateAcceptedField,
    deleteEvent
  };
};

export default useEvent;
