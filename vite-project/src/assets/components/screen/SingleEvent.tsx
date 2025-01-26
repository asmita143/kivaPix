import { useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent"; // Import your custom hook

const SingleEvent = () => {
  // Get event ID from URL params
  const { id } = useParams<{ id: string }>();

  // Fetch events using the useEvent hook
  const { events1 } = useEvent();

  // Find the event by ID
  const event = events1.find((e) => e.id === id); // Use id as string directly if it's string in Firestore

  // If event is not found, return a not found message
  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="single-event-container">
      <div className="event-banner">
        <img src="https://picsum.photos/200/300" alt={event.name} />
      </div>
      <div className="event-details">
        <h1>{event.name}</h1>
        <p>{event.date}</p>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default SingleEvent;
