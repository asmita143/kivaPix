import "../../../App.css";
import useEvent from "../hooks/useEvent";
import useUser from "../hooks/useUser";

import EventList from "../section/EventList";
import { useEffect, useMemo, useState } from "react";
import SortList from "../ui/Sort";
import SearchList from "../ui/Search";
import { MainLayout } from "../layout/MainLayout";
import EventHeader from "../section/EventHeader";

const InterestedEvents: React.FC = () => {
  const { events } = useEvent();
  const { userData, loadingUserData } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    console.log("Sort order or criteria changed:", { sortOrder, sortBy });
  }, [sortOrder, sortBy]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const interestedEventIds: string[] = userData?.interestedEvents || [];

  const interestedEvents = events.filter((event) =>
    interestedEventIds.includes(String(event.id))
  );

  const upcomingInterestedEvents = interestedEvents.filter((event) => {
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
    return upcomingInterestedEvents
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
    upcomingInterestedEvents,
    searchTerm,
    searchDate,
    searchLocation,
    sortOrder,
    sortBy,
  ]);

  if (loadingUserData) return <p>Loading user data...</p>;

  return (
    <MainLayout>
      <EventHeader title="Interested Events" />

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

      {/* Filtered Interested Events */}
      <EventList allEvents={filteredEvents} />
    </MainLayout>
  );
};

export default InterestedEvents;
