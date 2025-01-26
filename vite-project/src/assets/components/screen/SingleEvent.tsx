// src/assets/components/screen/SingleEvent.tsx
import { useParams } from "react-router-dom";
import events from "../hooks/useEvents";

const SingleEvent = () => {
  // Get event ID from URL params
  const { id } = useParams<{ id: string }>();

  // Find the event by ID
  const event = events.find((e) => e.id === parseInt(id || "", 10));

  // If event is not found, return a not found message
  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="single-event-container">
      <div className="event-banner">
        <img src={event.imageSrc} alt={event.name} />
      </div>
      <div className="event-details">
        <h1>{event.name}</h1>
        <p>{event.date}</p>
        <p>{event.location}</p>
        <p>{event.description}</p>
        <p>Organized by: {event.organizer}</p>
        <p>Contact: {event.contact}</p>
      </div>
    </div>
  );
};

export default SingleEvent;
