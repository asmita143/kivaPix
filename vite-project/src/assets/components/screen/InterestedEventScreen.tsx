import useEvent from "../hooks/useEvent";
import useImage from "../hooks/useImage";
import useUser from "../hooks/useUser";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import imageNotAvailable from "../../images/NotAvailable.jpg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HamburgerMenu from "../utils/HamBurgerMenu";

const InterestedEvents: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { events } = useEvent(); 
  const { userData, loading: userLoading } = useUser();  
  const {coverPhotos, fetchCoverPhotos } = useImage("");
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCoverPhotos()
  }, []);
  
  if (userLoading) return <p>Loading user data...</p>;
  
  const interestedEventIds: string[] = userData?.interestedEvents || [];
  
  const interestedEvents = events.filter((event) =>
      interestedEventIds.includes(String(event.id))
  );

  const handleEventClick = (id: string, coverPhotoUrl: string) => {
      navigate(`/event/${id}`, { state: { coverPhotoUrl } });
  };

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
        <main className="flex flex-col p-3 w-full flex-grow min-h-0 transition-all duration-300">
          {/* Top Part: Sticky Header */}
          <div className="sticky top-0 flex-none bg-white shadow-sm rounded-t-lg p-2 md:p-3">
            <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              Interested Events
            </h1>
          </div>
          {/* Bottom Part: Scrollable Grid View */}
          <div className="flex-1 overflow-y-auto min-h-0 ">
            {interestedEvents.length === 0 ? (
              <p className="text-center text-gray-600">
                No interested events yet.
              </p>
            ) : (
              <div className="flex flex-wrap flex-grow gap-6 p-4">
                {interestedEvents.map((event) => (
                  <div key={event.id} className="relative group bg-gray-200 rounded-lg hover:drop-shadow-lg flex flex-col h-full w-72">
                    <img
                      src={coverPhotos[String(event.id)] || imageNotAvailable}
                      alt={event.name}
                      className="aspect-[4/3] w-full rounded-lg object-cover group-hover:opacity-95 cursor-pointer border border-gray-300"
                      onClick={() =>
                        event.id &&
                        handleEventClick(
                          event.id,
                          coverPhotos[String(event.id)] || imageNotAvailable
                        )
                      }
                    />
                    <div className="p-4">
                      <h3 className="mt-4 text-md text-gray-700 font-bold truncate">
                        {event.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 truncate ">
                        {event.location?.name || "No location available"}
                      </p>
                      </div>
                      <div className="absolute top-0 left-0 w-16 h-16 bg-gray-700 rounded-tl-lg rounded-br-lg flex flex-col items-center justify-center">
                        {event.date ? (
                          <>
                            <p className="text-white text-xl font-bold">
                              {new Date(event.date).getDate()}
                            </p>
                            <p className="text-white text-sm">
                              {new Date(event.date).toLocaleString('en-US', { month: 'short' })}
                            </p>
                          </>
                        ) : (
                          <div className="flex-col justify-center"> 
                            <p className="text-white">No </p>
                            <p className="text-white">date</p>
                          </div>
                        )}
                    </div>
                    <div className="mt-auto bg-gray-200 text-black rounded-lg w-full p-2">
                      <button className="bg-gray-300 w-full">
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
    );
  };
  
  export default InterestedEvents;
  