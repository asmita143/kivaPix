import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../../../firebase";


interface Event {
    id: string; 
    name: string; 
    date: string; 
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
          const eventsData = eventList.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id, 
          })) as Event[];
  
          setEvents(eventsData);

        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
  
      fetchEvents();
      
    }, []);

    return { events1 }
};

export default useEvent;