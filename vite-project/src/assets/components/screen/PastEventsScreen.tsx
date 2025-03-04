import useEvent from "../hooks/useEvent";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import { useState, useMemo } from "react";
import HamburgerMenu from "../utils/HamBurgerMenu";
import EventList from "../section/EventList";
import SortList from "../ui/Sort";
import SearchList from "../ui/Search";

const PastEvents: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { events } = useEvent();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pastEvents = events.filter((event) => {
    if (!event?.date) return false;

    let eventDate;

    if (event.date instanceof Date) {
      eventDate = event.date;
    } else {
      return false;
    }

    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  });

  const filteredAndSortedEvents = useMemo(() => {
    return [...pastEvents]
      .filter((event) => {
        const locationMatch =
          event.location && event.location.name
            ? event.location.name
                .toLowerCase()
                .includes(searchLocation.toLowerCase())
            : !searchLocation;

        const dateMatch = searchDate
          ? new Date(event.date ?? "").toDateString() ===
            new Date(searchDate).toDateString()
          : true;

        return (
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          locationMatch &&
          dateMatch
        );
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === "date") {
          const aDate = new Date(a.date ?? "").getTime();
          const bDate = new Date(b.date ?? "").getTime();
          return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
        }
        return 0;
      });
  }, [pastEvents, sortOrder, sortBy, searchTerm, searchDate, searchLocation]);

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
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
        <main className="flex flex-col p-3 w-full flex-grow min-h-0 transition-all duration-300 gap-4 relative">
          {/* Top Part: Sticky Header */}
          <div className="sticky top-0 flex-none shadow-lg rounded-lg p-2 md:p-3 bg-white z-10">
            <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              Previous Events
            </h1>
          </div>

          {/* Search and Sort Section */}
          <div className="flex items-center justify-end gap-2 mb-4 relative z-20">
            <SearchList
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchDate={searchDate}
              setSearchDate={setSearchDate}
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
            />
            <SortList
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          {/* Past Events List */}
          <EventList allEvents={filteredAndSortedEvents} />
        </main>
      </div>
    </div>
  );
};

export default PastEvents;
