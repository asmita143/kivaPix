import useEvent from "../hooks/useEvent";
import useUser from "../hooks/useUser";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import { useState } from "react";
import HamburgerMenu from "../utils/HamBurgerMenu";
import EventList from "../section/EventList";

const InterestedEvents: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { events } = useEvent(); 
  const { userData, loading: userLoading } = useUser();  

  
  if (userLoading) return <p>Loading user data...</p>;
  
  const interestedEventIds: string[] = userData?.interestedEvents || [];
  
  const interestedEvents = events.filter((event) =>
      interestedEventIds.includes(String(event.id))
  );

    return (
      <div className="app-container bg-gray-100 w-screen h-screen flex flex-colitems">
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
        <main className="flex flex-col p-3 w-full flex-grow min-h-0 transition-all duration-300 gap-4">
          {/* Top Part: Sticky Header */}
          <div className="sticky top-0 flex-none shadow-lg rounded-lg p-2 md:p-3">
            <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              Interested Events
            </h1>
          </div>
          {/* Bottom Part: Scrollable Grid View */}
          <EventList allEvents={interestedEvents} />
        </main>
      </div>
    </div>
    );
  };
  
  export default InterestedEvents;
  