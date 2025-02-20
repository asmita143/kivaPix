import "../../../App.css";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import { useState } from "react";
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
import mapImage from "../../images/map.jpg";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const EventDescriptionScreen = () => {
  const locationForImage = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { events = [] } = useEvent();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const coverPhotoUrl =
    locationForImage.state?.coverPhotoUrl || imageNotAvailable;
  const event = events.find((e) => e.id === id);

  const formattedDate =
    event?.date instanceof Date
      ? event.date.toLocaleDateString()
      : "No date available";

  const lat = event?.location.coordinates.lat;
  const lng = event?.location.coordinates.lng;

  return (
    <div className="app-container bg-gray-100 w-screen min-h-screen flex flex-col">
      {/* Top Header Section */}
      <HeaderSection />

      {/* Sidebar & Main Layout */}
      <div className="flex flex-grow bg-gray-100 min-h-0">
        {/* Hamburger Menu Button */}
        <HamburgerMenu
          setSidebarVisible={setSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white transform transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex flex-col flex-1 min-h-0 p-6 transition-all duration-300 overflow-y-auto">
          {/* Hero Image Section */}
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

          {/* Event Details Section */}
          <div className="mt-8 sm:px-2">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 md:p-6 rounded-lg shadow-lg gap-6 md:gap-0">
              <div className="flex-1 space-y-3 md:space-y-4 w-full">
                <h2 className="text-base md:text-2xl font-bold text-gray-800">
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
                  <p className="text-sm md:text-lg ">
                    <span className="font-semibold ">Time:</span>{" "}
                    {event?.startTime} - {event?.endTime}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <FaUsers className="text-orange-500" />
                  <p className="text-sm md:text-lg">
                    <span className="font-semibold">Participants:</span>{" "}
                    {event?.participants || "Not Available"}
                    {event?.participants}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {" "}
                  <FaFileContract className="text-orange-500" />
                  <p className="text-sm md:text-lg">
                    <span className="font-semibold">Contract type:</span> {event?.contractType || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px h-48 bg-gray-300 mx-10"></div>
              <div className="sm:hidden w-full h-px bg-gray-300 mx-10"></div>

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

              <div className="hidden md:block w-px h-48 bg-gray-300 mx-10"></div>
              <div className="sm:hidden w-full h-px bg-gray-300 mx-10"></div>

              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-base md:text-lg font-semibold hover:border-black border-2 transition duration-300 w-full md:w-auto order-last md:order-none"
                onClick={() => navigate(`/Photogallery/${id}`)}
              >
                View Gallery
              </button>
              {/* Host Details Section */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6">
              {/* Description Card */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500">
                <h2 className="text-base md:text-2xl font-bold mb-4 text-gray-800">
                  About the Event
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-lg">
                  {event?.description ||
                    "Join us for an unforgettable experience filled with music, networking, and fun!"}
                </p>
              </div>

              {/* Map Card */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
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
                <p className="mt-3 md:mt-4 text-sm md:text-lgtext-gray-700">
                  {event?.location?.name || "Downtown Arena, New York"}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDescriptionScreen;
