import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../../../firebase";
import { addDoc, Timestamp } from "firebase/firestore";

// Define a type for the location
interface EventLocation {
  name: string; // The name of the location (e.g., "Leppavaara, Espoo")
  coordinates: {
    lat: number; // Latitude
    lng: number; // Longitude
  };
}
interface Event {
  imageSrc?: string;
  id?: string;
  name: string;
  date?: Date | null; // ISO string representation of the date
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
}

const useEvent = () => {
  const [events1, setEvents] = useState<Event[]>([]);
  const [eventUpoading, setEventUploading] = useState(false);
  const eventRef = collection(db, "Event");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch all documents from the collection
        const eventList = await getDocs(eventRef);

        // Map Firestore documents to an array of Event objects
        const eventsData = eventList.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            date: data.date?.toDate ? data.date.toDate() : null,
            location: data.location || {
              name: "",
              coordinates: { lat: 0, lng: 0 },
            },
          } as Event;
        });

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (newEvent: Event) => {
    setEventUploading(true)
    try {
      const docRef = await addDoc(eventRef, {
        ...newEvent,
        date: newEvent.date ? Timestamp.fromDate(newEvent.date) : null,
      });
      setEvents((prevEvents) => [...prevEvents, newEvent]);

      return docRef.id;

    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setEventUploading(false)
    }
  };

  return { events1, addEvent, eventUpoading };
};

export default useEvent;
