import "../../../App.css";
import useEvent from "../hooks/useEvent";
import EventList from "../section/EventList";
import { useEffect, useMemo, useState } from "react";

import SortList from "../ui/Sort";
import SearchList from "../ui/Search";
import EventHeader from "../section/EventHeader";
import { MainLayout } from "../layout/MainLayout";

const Home: React.FC = () => {
  const { events } = useEvent(); // Fetch events from Firebase
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name"); // Default sort by name

  useEffect(() => {
    console.log("Sort order or criteria changed:", { sortOrder, sortBy });
  }, [sortOrder, sortBy]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter((event) => {
    if (!event?.date) return false;

    let eventDate;

    if (event.date instanceof Date) {
      eventDate = event.date;
    } else {
      return false;
    }
    return eventDate >= today;
  });

  const filteredEvents = useMemo(() => {
    return upcomingEvents
      .filter((event) => {
        const locationMatch =
          event.location && event.location.name
            ? event.location.name
                .toLowerCase()
                .includes(searchLocation.toLowerCase())
            : !searchLocation; // Only match if searchLocation is empty or no location is provided

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
  }, [events, searchTerm, searchDate, searchLocation, sortOrder, sortBy]);

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      <MainLayout>
        <main className="flex flex-col p-3 w-full flex-grow min-h-0 transition-all duration-300 gap-4 relative">
          {/* Top Part: Sticky Header */}
          <EventHeader title="Upcoming Events" />

          {/* Search and Sort Section */}
          <div className="flex items-center justify-end gap-2 mb-4">
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

          <EventList allEvents={filteredEvents} />
        </main>
      </MainLayout>
    </div>
  );
};

export default Home;
