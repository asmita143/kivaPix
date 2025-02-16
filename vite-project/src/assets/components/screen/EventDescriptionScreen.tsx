import "../../../App.css";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import imageNotAvailable from "../../images/NotAvailable.png"
import useEvent from "../hooks/useEvent";
import { FaCalendarDay, FaClock, FaEnvelope, FaPhone, FaUser, FaUsers } from "react-icons/fa";
import mapImage from "../../images/map.jpg";

const EventDescriptionScreen = () => {
  const locationForImage = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { events = [] } = useEvent();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const coverPhotoUrl = locationForImage.state?.coverPhotoUrl || imageNotAvailable;
  const event = events.find((e) => e.id === id);

  const formattedDate =
    event?.date instanceof Date
      ? event.date.toLocaleDateString()
      : "No date available";

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
          <div className="relative w-full h-[20rem] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
            <img
              src={coverPhotoUrl}
              alt={event?.name}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute bottom-8 left-8">
              <h1 className="text-4xl font-bold text-white">{event?.name}</h1>
            </div>
          </div>

          {/* Event Details Section */}
          <div className="mt-8">
            {/* Event Metadata */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-lg shadow-lg">
              <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Event Details</h2>
                <div className="flex items-center space-x-4">
                  <FaCalendarDay className="text-orange-500" />
                  <p className="text-lg">
                    <span className="font-semibold">Date:</span> {formattedDate}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <FaClock className="text-orange-500" />
                  <p className="text-lg">
                    <span className="font-semibold">Time:</span> 15:30
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <FaUsers className="text-orange-500" />
                  <p className="text-lg">
                    <span className="font-semibold">Participants:</span> 55
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px h-48 bg-gray-300 mx-10"></div>

              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Host Details</h2>
                  <div className="flex items-center space-x-4">
                    <FaUser className="text-orange-500" />
                    <p className="text-lg text-gray-700">HostName</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaPhone className="text-orange-500" />
                    <p className="text-lg text-gray-700">+358-449541977</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaEnvelope className="text-orange-500" />
                    <p className="text-lg text-gray-700">abcXYZ@gmail.com</p>
                  </div>
              </div>

              <div className="hidden md:block w-px h-4 bg-gray-300 mx-10"></div>

              <button 
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:border-black border-2 transition duration-300 mt-4 md:mt-0"
                onClick={() => navigate(`/Photogallery/${id}`)}
                >
                View Gallery
              </button>
              {/* Host Details Section */}
            </div>

            {/* Creative Card Layout for Description and Map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Description Card */}
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  About the Event
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {event?.description ||
                    "Join us for an unforgettable experience filled with music, networking, and fun!"}
                </p>
              </div>

              {/* Map Card */}
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Location
                </h2>
                <img
                  src={mapImage}
                  alt="Event Location Map"
                  className="map-image"
                />
                <p className="mt-4 text-lg text-gray-700">
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
