import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../../../firebase";
import { Timestamp } from "firebase/firestore";

interface Event {
  imageSrc: string | undefined;
  id: string;
  name: string;
  date: string; // ISO string representation of the date
  description: string;
}

const useEvent = () => {
  const [events1, setEvents] = useState<Event[]>([]);
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
            date: (data.date as Timestamp)?.toDate().toISOString() || "", // Handle Firestore Timestamp conversion
          } as Event;
        });

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return { events1 };
};

export default useEvent;
