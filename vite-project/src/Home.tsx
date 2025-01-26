import "./App.css";
import { useNavigate } from "react-router-dom";
import events from "./assets/components/hooks/useEvents";
import StarRating from "./assets/components/utils/starRating";
import {
  SideBarItemList,
  sidebarItems,
} from "./assets/components/section/SideBar";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleEventClick = (id: number) => {
    // Navigate to SingleEvent page and pass the event ID as a route parameter
    navigate(`/event/${id}`);
  };

  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="header">
        <div className="left-header flex items-start">🌟 kivaPix</div>
        <div className="right-header flex items-end">
          <span className="username">Asmita Shrestha</span>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="w-64 bg-white shadow-md pt-6 pb-6 px-4">
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-900">Events</h1>
              <input
                type="text"
                placeholder="Search Events"
                className="mt-4 p-2 w-full border border-gray-100 rounded-lg bg-gray-200 focus:bg-white hover:bg-gray-100 width-full"
              />
            </div>
            <nav className="mt-6">
              <ul>
                {sidebarItems.map((item, index) => (
                  <SideBarItemList
                    key={index}
                    label={item.label}
                    dropdownItems={
                      item.isDropdown ? item.dropdownItems : undefined
                    }
                  />
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="sub-main-content overflow-y-auto max-h-screen">
            <div className="bg-white">
              <h1 className="p-5 font-bold">All Events</h1>
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">events</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="group cursor-pointer"
                      onClick={() => handleEventClick(event.id)}
                    >
                      <img
                        alt={event.name}
                        src={event.imageSrc}
                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                      />
                      <h3 className="mt-4 text-md text-gray-700 font-bold">
                        {event.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 font-bold">
                        Date: {event.date}
                      </p>
                      <p className="mt-1 text-sm text-black-100">
                        Location: {event.location}
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
