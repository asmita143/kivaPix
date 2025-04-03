import "../../../App.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import imageNotAvailable from "../../images/NotAvailable.png";
import useEvent from "../hooks/useEvent";
import {
  FaCalendarDay,
  FaClock,
  FaEnvelope,
  FaFileContract,
  FaPhone,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import useUser from "../hooks/useUser";
import { Role } from "../utils/Role";
import { Button } from "@radix-ui/themes";
import { MainLayout } from "../layout/MainLayout";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const EventDescriptionScreen = () => {
  const locationForImage = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { events = [], unassignEvent, updateAcceptedField, eventAcceptedBy } = useEvent();
  const coverPhotoUrl =
    locationForImage.state?.coverPhotoUrl || imageNotAvailable;
  const event = events.find((e) => e.id === id);
  const { userData, allUsers } = useUser();
  const [acceptedUserName, setAcceptedUserName] = useState<string | null>(null);

  const acceptedEventIds: string[] = userData?.acceptedEvent || [];

  const isAdmin = userData?.role === Role.Admin;

  const formattedDate =
    event?.date instanceof Date
      ? event.date.toLocaleDateString()
      : "No date available";

  const lat = event?.location?.coordinates?.lat;
  const lng = event?.location?.coordinates?.lng;

  const handleEditClick = () => {
    navigate(`../editEvent/${event?.id}`);
  };

  const isEventAccepted = acceptedEventIds.includes(String(id));
  
  useEffect(() => {
    if (event?.acceptedBy) {
      const acceptor = allUsers.find((user) => user.uid === event.acceptedBy);
      setAcceptedUserName(acceptor?.name || null);
    }
  }, [event, allUsers]);

  const handleUnassign = async () => {
    const acceptor = allUsers.find((user) => user.uid === event?.acceptedBy);
    await unassignEvent(String(acceptor?.uid), String(event?.id))
    await updateAcceptedField(String(event?.id), false)
    await eventAcceptedBy("", String(event?.id))

    setAcceptedUserName(null)
  };

  return (
    <MainLayout>
      <div className="relative w-full h-[10rem] sm:h-[20rem] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
        <img
          src={coverPhotoUrl}
          alt={event?.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-6 left-6">
          <h1 className="text-xl sm:text-4xl font-bold text-white">
            {event?.name}
          </h1>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {(isEventAccepted || isAdmin) && (
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/PhotoGallery/${id}`)}
          >
            View Gallery
          </Button>
        )}

        {isAdmin && (
          <Button
            style={{ cursor: "pointer" }}
            color="orange"
            onClick={handleEditClick}
          >
            Edit Event
          </Button>
        )}
      </div>

      {acceptedUserName && (
        <div className="flex mt-5 bg-green-200 w-fit rounded-lg p-4 gap-5 items-center">
          <p>This event has been accepted by <strong>{acceptedUserName}</strong></p>
          {(isAdmin || isEventAccepted) && (
            <Button
              style={{ cursor: "pointer" }}
              color="orange"
              onClick={handleUnassign}
            >
              Unassign
            </Button>
          )}
        </div>
      )}

      {/* Event Details Section */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row justify-between bg-white rounded-lg p-4 md:p-6 rounded-lg gap-6 md:gap-0">
          <div className="flex-1 space-y-3 md:space-y-4 w-full">
            <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-800">
              Event Details
            </h2>
            <div className="flex items-center space-x-4">
              <FaCalendarDay className="text-orange-500" />
              <p className="text-sm md:text-lg">
                <span className="font-semibold">Date:</span> {formattedDate}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaClock className="text-orange-500" />
              <p className="text-sm md:text-lg">
                <span className="font-semibold">Time:</span> {event?.startTime}{" "}
                - {event?.endTime}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaUsers className="text-orange-500" />
              <p className="text-sm md:text-lg">
                <span className="font-semibold">Participants:</span>{" "}
                {event?.participants || "Not Available"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaFileContract className="text-orange-500" />
              <p className="text-sm md:text-lg">
                <span className="font-semibold">Contract type:</span>{" "}
                {event?.contractType || "Not Available"}
              </p>
            </div>
          </div>

          <div>
            <div className="hidden md:block w-px h-48 bg-gray-300 mx-20"></div>
            <div className="md:hidden w-full h-px bg-gray-300 mx-10"></div>
          </div>

          <div className="flex-1 space-y-3 md:space-y-4 w-full">
            <h2 className="text-base md:text-2xl font-bold text-gray-800">
              Host Details
            </h2>
            <div className="flex items-center space-x-4">
              <FaUser className="text-orange-500" />
              <p className="text-sm md:text-lg text-gray-700">
                {event?.hostFirstName} {event?.hostLastName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-orange-500" />
              <a
                href={`tel:${event?.hostPhone}`}
                className="text-sm md:text-lg text-gray-700"
              >
                {event?.hostPhone || "Not Available"}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-orange-500" />
              <a
                href={`mailto:${event?.hostEmail}`}
                className="text-sm md:text-lg text-gray-700"
              >
                {event?.hostEmail || "Not Available"}
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6">
          {/* Description Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg transition-shadow duration-300 border-l-4 border-orange-500">
            <h2 className="text-base md:text-2xl font-bold mb-4 text-gray-800">
              About the Event
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-lg">
              {event?.description ||
                "Join us for an unforgettable experience filled with music, networking, and fun!"}
            </p>
          </div>

          {/* Map Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg transition-shadow duration-300 border-l-4 border-blue-500">
            <h2 className="text-base md:text-2xl font-bold mb-6 text-gray-800">
              Location
            </h2>
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}`}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-700">
              {event?.location?.name || "Location not available"}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDescriptionScreen;
