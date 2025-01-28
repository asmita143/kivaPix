import "./App.css";
import { useNavigate } from "react-router-dom";
import useEvent from "./assets/components/hooks/useEvent";
import StarRating from "./assets/components/utils/starRating";
import SideBar from "./assets/components/section/SideBar";
import HeaderSection from "./assets/components/section/HeaderSection";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { events1 } = useEvent(); // Fetch events from Firebase
  const handleEventClick = (id: string) => {
    // Navigate to SingleEvent page and pass the event ID as a route parameter
    navigate(`/event/${id}`);
  };

  return (
    <div className="app-container">
      {/* Top Bar */}
      <HeaderSection />
      {/* Sidebar and Main Content */}
      <div className="layout flex">
        {/* Sidebar */}

        <aside className="w-64">
          <SideBar />
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="sub-main-content overflow-y-auto max-h-screen">
            <div className="bg-white">
              <h1 className="p-5 font-bold">All Events</h1>
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">events</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
                  {events1.map((event) => (
                    <div
                      key={event.id}
                      className="group cursor-pointer"
                      onClick={() => handleEventClick(event.id)}
                    >
                      <img
                        alt={event.name}
                        src="https://picsum.photos/200/300"
                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                      />
                      <h3 className="mt-4 text-md text-gray-700 font-bold">
                        {event.name}
                      </h3>
                      <div>
                        <p className="mt-1 text-sm text-gray-600 font-bold">
                          Date:{" "}
                          {event.date
                            ? new Date(event.date).toLocaleDateString()
                            : "No date available"}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-black-100">
                        Location:{"Leppavaara, Espoo"}
                      </p>
                      <div className="mt-4 flex space-x-4">
                        <button className="px-10 py-2 bg-gray-200 text-black rounded-lg hover:bg-green-700 w-4/5">
                          Accept
                        </button>
                        <StarRating />
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
