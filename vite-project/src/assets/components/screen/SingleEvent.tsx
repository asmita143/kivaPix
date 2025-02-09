import { useLocation, useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent"; // Import your custom hook
import mapImage from "../../images/map.jpg";
import "../../../App.css";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import imageNotAvailable from "../../images/NotAvailable.jpg"

const SingleEvent = () => {
  // Get event ID from URL params
  const { id } = useParams<{ id?: string }>();

  // Fetch events using the useEvent hook
  const { events = [] } = useEvent();

  // Find the event by ID
  const event = events.find((e) => e.id === id); // Use id as string directly if it's string in Firestore

  // If event is not found, return a not found message
  if (!event) {
    return <p>Event not found.</p>;
  }
  // Destructure location with fallback to prevent undefined errors
  const { location } = event;
  const locationForImage = useLocation();
  const locationName = location?.name || "Location not available";
  const locationLat = location?.coordinates?.lat || "Latitude not available";
  const locationLng = location?.coordinates?.lng || "Longitude not available";
  const coverPhotoUrl = locationForImage.state?.coverPhotoUrl || imageNotAvailable;

  const formattedDate =
    event.date instanceof Date
      ? event.date.toLocaleDateString()
      : "No date available";
  return (
    <div className="app-container">
      <HeaderSection />
      <div className="layout flex">
        <Sidebar showButton={true} />
        <div className="single-event-container flex flex-col s:flex-col md:flex-col w-full ">
          <div className="bg-gray-50 py-20 lg:py-16">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
              <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
                {event.name}
              </p>
              <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                <div className="relative lg:row-span-2">
                  <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                    <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                      <div className="">
                        <img
                          className="size-full object-cover object-top"
                          src={coverPhotoUrl}
                          alt={event.name}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                </div>
                <div className="relative max-lg:row-start-1">
                  <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                        What?
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2"></div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
                </div>
                <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                  <div className="absolute inset-px rounded-lg bg-white"></div>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                        When?
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {formattedDate}
                      </p>
                    </div>
                    <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2"></div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
                </div>
                <div className="relative lg:row-span-2">
                  <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                    <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                        Where?
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"></p>
                    </div>
                    <div className="relative min-h-[30rem] w-full grow">
                      <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl  shadow-2xl">
                        <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                          <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                            <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                              Location
                            </div>
                          </div>
                        </div>
                        <div className="h-full bg-gray-200 px-6 pt-6 pb-14">
                          <img
                            src={mapImage}
                            alt="Event Location Map"
                            className="map-image"
                          />
                          <p className="mt-2 text-sm text-gray-600 max-lg:text-center">
                            {locationName}{" "}
                            {/* Safely displaying location name */}
                          </p>
                          <p className="mt-2 text-sm text-gray-600 max-lg:text-center">
                            Coordinates: {locationLat}, {locationLng}{" "}
                            {/* Safely displaying coordinates */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
