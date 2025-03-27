import useEvent from "../hooks/useEvent";
import { useState, useMemo } from "react";
import EventList from "../section/EventList";
import SortList from "../ui/Sort";
import SearchList from "../ui/Search";
import { MainLayout } from "../layout/MainLayout";
import EventHeader from "../section/EventHeader";

const PastEvents: React.FC = () => {
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
    <MainLayout>
      <EventHeader title="Previous Events" />

      {/* Search and Sort Section */}
      <div className="flex items-center justify-end gap-2 mb-4 ">
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
    </MainLayout>
  );
};

export default PastEvents;
