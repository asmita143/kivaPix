import useEvent from "../hooks/useEvent";
import useImage from "../hooks/useImage";
import useUser from "../hooks/useUser";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import imageNotAvailable from "../../images/NotAvailable.jpg"
import { useNavigate } from "react-router-dom";

const InterestedEvents: React.FC = () => {
    const { events } = useEvent(); 
    const { userData, loading: userLoading } = useUser();  
    const {coverPhotos } = useImage("");
    const navigate = useNavigate();
  
    if (userLoading) return <p>Loading user data...</p>;
  
    const interestedEventIds: string[] = userData?.interestedEvents || [];
  
    const interestedEvents = events.filter((event) =>
      interestedEventIds.includes(String(event.id))
    );

    const handleEventClick = (id: string, coverPhotoUrl: string) => {
        navigate(`/event/${id}`, { state: { coverPhotoUrl } });
      };
  
    return (
      <div className="app-container">
        <HeaderSection />
        <div className="layout flex">
          <aside className="w-64 shadow-md">
            <Sidebar showButton={true} />
          </aside>
          <main className="main-content flex-1 p-2">
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm p-4 rounded-lg">
              <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
                Interested Events
              </h1>
            </div>
            {/* Scrollable grid of interested events */}
            <div className="overflow-y-auto max-h-screen px-4 py-4">
              {interestedEvents.length === 0 ? (
                <p className="text-center text-gray-600">No interested events yet.</p>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {interestedEvents.map((event) => (
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
                      <h3 className="mt-4 text-md text-gray-700 font-bold">
                        {event.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 font-bold">
                        Date:{" "}
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "No date available"}
                      </p>
                      <p className="mt-1 text-sm text-black-100">
                        Location:{" "}
                        {event.location?.name || "No location available"}
                      </p>
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
  