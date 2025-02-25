import useImage from "../hooks/useImage";
import imageNotAvailable from "../../images/NotAvailable.png";
import { useLocation, useNavigate } from "react-router-dom";
import useEvent, { Event } from "../hooks/useEvent";
import StarRating from "../utils/starRating";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import AcceptEvent from "./AcceptEvent";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

interface EventListProps {
  allEvents: Event[];
}

const EventList: React.FC<EventListProps> = ({ allEvents }) => {
  const { coverPhotos, fetchCoverPhotos, loading } = useImage("");
  const navigate = useNavigate();
  const { updateInterestedEventsForUser, acceptEvent } = useEvent();
  const [selectedEventId, setSelectedEventId] = useState<string | null>();
  const [selectedEventLocation, setSelectedEventLocation] = useState<
    string | null
  >(null);
  const [selectedEventDate, setSelectedEventDate] = useState<string | null>(
    null
  );
  const { user, userData } = useUser();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const isAcceptedPage = location.pathname === "/events/accepted";
  const isPastEvent = location.pathname === "/events/past";

  const [isModalOpen, setModalOpen] = useState(false);

  const handleAccept = async () => {
    if (!user || !selectedEventId) {
      return;
    }
    await acceptEvent(user.uid, selectedEventId);

    setModalOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setModalOpen(false);
  };

  const handleAcceptClick = (event: Event) => {
    console.log(event.date);
    setSelectedEventId(event.id);
    setSelectedEventLocation(event.location?.name || "Not available");
    const eventDate = event.date;
    if (eventDate) {
      setSelectedEventDate(new Date(eventDate).toLocaleDateString());
    }

    setModalOpen(true); // Open the modal
  };

  useEffect(() => {
    fetchCoverPhotos();
  }, []);

  const handleEventClick = (id: string, coverPhotoUrl: string) => {
    navigate(`/event/${id}`, { state: { coverPhotoUrl } });
  };

  const handleStarClick = async (event: any, isSelected: boolean) => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
    await updateInterestedEventsForUser(user.uid, event.id, isSelected);
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-0 p-6">
      {loading ? ( // Show loading indicator if loading is true
        <div className="flex items-center justify-center h-[70vh]">
          <CircularProgress color="primary" />
          <p className="ml-4 text-gray-700 text-xl font-medium">
            Loading events...
          </p>
        </div>
      ) : allEvents.length === 0 ? (
        <p className="text-center text-gray-600">No events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {allEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
            >
              {/* Event Image */}
              <img
                src={coverPhotos[String(event.id)] || imageNotAvailable}
                alt={event.name}
                className="aspect-[4/3] w-full h-[10rem]  object-cover cursor-pointer border-b-2 border-gray-100"
                onClick={() =>
                  event.id &&
                  handleEventClick(
                    event.id,
                    coverPhotos[String(event.id)] || imageNotAvailable
                  )
                }
              />

              {/* Event Date Badge */}
              <div className="absolute top-2 left-2 bg-white backdrop-blur-sm rounded-lg p-2 text-center shadow-sm">
                {event.date ? (
                  <>
                    <p className="text-sm sm:text-xl font-bold text-gray-800 leading-tight">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-sm sm:text-xl text-gray-600 tracking-wide">
                      {new Date(event.date).toLocaleString("en-US", {
                        month: "short",
                      })}
                    </p>
                  </>
                ) : (
                  <div className="flex-col justify-center">
                    <p className="text-black text-sm sm:text-xl">No </p>
                    <p className="text-black text-sm sm:text-xl">date</p>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                  {event.name}
                </h3>
                <p className="mt-1 sm:mt-2 text-sm text-gray-600 truncate">
                  {event.description ||
                    "Join us for an unforgettable experience!"}
                </p>

                {/* Location and Date */}
                <div className="mt-3 sm:mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {event.location?.name || "No location available"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <p className="text-xs sm:text-sm text-gray-600">
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "No date available"}
                    </p>
                  </div>
                </div>

                {/* Accept Button and Star Rating */}
                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  {!isAcceptedPage && !isPastEvent && (
                    <button
                      className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-semibold hover:border-black border-2 transition duration-300"
                      onClick={() => handleAcceptClick(event)}
                    >
                      Accept
                    </button>
                  )}
                  {isHomePage && (
                    <StarRating
                      isInterested={(
                        (userData?.interestedEvents as string[]) ?? []
                      ).includes(String(event.id))}
                      onClick={(newState: boolean) =>
                        handleStarClick(event, newState)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Accept Event Modal */}
      <AcceptEvent
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleAccept}
        location={selectedEventLocation || "Unknown location"}
        date={selectedEventDate || "Unknown date"}
      />
    </div>
  );
};

export default EventList;
