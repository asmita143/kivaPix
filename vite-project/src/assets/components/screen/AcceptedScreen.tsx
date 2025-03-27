import useEvent from "../hooks/useEvent";
import useUser from "../hooks/useUser";
import { useState, useMemo, useEffect } from "react";
import EventList from "../section/EventList";
import SortList from "../ui/Sort";
import SearchList from "../ui/Search";
import { MainLayout } from "../layout/MainLayout";

const AcceptedEvents: React.FC = () => {
  const { events } = useEvent();
  const { userData, loadingUserData } = useUser();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    console.log("Sort order or criteria changed:", { sortOrder, sortBy });
  }, [sortOrder, sortBy]);

  const acceptedEventIds: string[] = userData?.acceptedEvent || [];

  const acceptedEvents = events.filter((event) =>
    acceptedEventIds.includes(String(event.id))
  );

  const filteredAndSortedEvents = useMemo(() => {
    return [...acceptedEvents]
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
  }, [
    acceptedEvents,
    sortOrder,
    sortBy,
    searchTerm,
    searchDate,
    searchLocation,
  ]);

  if (loadingUserData) return <p>Loading user data...</p>;

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      <MainLayout>
        {/* Main Content */}
        <main className="flex flex-col p-3 w-full flex-grow min-h-0 transition-all duration-300 gap-4 relative">
          {/* Top Part: Sticky Header */}
          <div className="sticky top-0 flex-none shadow-lg rounded-lg p-2 md:p-3 bg-white z-10">
            <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              Accepted Events
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

          {/* Accepted Events List */}
          <EventList allEvents={filteredAndSortedEvents} />
        </main>
      </MainLayout>
    </div>
  );
};

export default AcceptedEvents;
