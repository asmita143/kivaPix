import React from "react";
import useEvent from "../hooks/useEvent";

const EventList = () => {
  const { events1 } = useEvent();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events1.length > 0 ? (
          events1.map((event) => (
            <div
              key={event.id}
              className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300"
            >
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="mt-2 text-gray-700 line-clamp-3">
                {event.description}
              </p>
            </div>
          ))
        ) : (
          <p>Loading events...</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
