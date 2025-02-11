import "../../../App.css";
import { useNavigate } from "react-router-dom";
import useEvent from "../hooks/useEvent";
import StarRating from "../utils/starRating";
import SideBar from "../section/SideBar";
import HeaderSection from "../section/HeaderSection";
import useImage from "../hooks/useImage";
import { useEffect } from "react";
import imageNotAvailable from "../../images/NotAvailable.jpg"
import useUser from "../hooks/useUser";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, userData } = useUser();
  const {fetchCoverPhotos, coverPhotos } = useImage("")
  const { events, updateInterestedEventsForUser, acceptEvent } = useEvent(); // Fetch events from Firebase

  const handleEventClick = (id: string, coverPhotoUrl: string) => {
    navigate(`/event/${id}`, { state: { coverPhotoUrl } });
  };

  useEffect(() => {
    fetchCoverPhotos()
  }, []);
  
  const handleStarClick = async (event: any, isSelected: boolean) => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
    await updateInterestedEventsForUser(user.uid, event.id, isSelected);
  };

  const handleacceptClick = async (eventId:string) => {
    if(!user){
      return
    }
    await acceptEvent(user.uid, eventId)
  };

  return (
    <div className="app-container">
      {/* Top Bar */}
      <HeaderSection />

      {/* Sidebar and Main Content */}
      <div className="layout flex">
        {/* Sidebar */}
        <aside className="w-64 shadow-md">
          <SideBar showButton={false} />
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="sub-main-content overflow-y-auto max-h-screen">
            <div className="bg-white">
              <h1 className="p-5 font-bold">All Events</h1>
              <div className="mx-auto px-4 py-16 sm:px-6 sm:py-16 lg:px-8">
                <h2 className="sr-only">events</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
                  {events.map((event) => (
                    <div key={event.id} className="group">
                      <div
                        className="cursor-pointer"
                        onClick={() => 
                          event.id && 
                          handleEventClick(event.id, coverPhotos[String(event.id)] || imageNotAvailable)
                        }
                      >
                        <img
                          alt={event.name}
                          src={coverPhotos[String(event.id)]|| imageNotAvailable}
                          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                        />
                        <h3 className="mt-4 text-md text-gray-700 font-bold truncate">
                          {event.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 font-bold">
                          Date:{" "}
                          {event.date
                            ? new Date(event.date).toLocaleDateString()
                            : "No date available"}
                        </p>
                        <p className="mt-1 text-sm text-black-100 truncate">
                          Location:{" "}
                          {event.location?.name || "No location available"}
                        </p>
                      </div>

                      {/* ❌ Non-Clickable Section: Buttons */}
                      <div className="mt-4 flex space-x-4">
                        <button 
                          className="px-10 py-2 bg-gray-200 text-black rounded-lg hover:bg-green-700 w-4/5"
                          onClick={() => handleacceptClick(event.id)}
                        >
                          Accept
                        </button>
                        <StarRating
                          isInterested={userData?.interestedEvents?.includes(String(event.id)) || false}
                          onClick={(newState: boolean) => handleStarClick(event, newState)}
                        />
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
