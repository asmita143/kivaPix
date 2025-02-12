import useImage from "../hooks/useImage";
import imageNotAvailable from "../../images/NotAvailable.jpg"
import { useLocation, useNavigate } from "react-router-dom";
import useEvent, { Event } from "../hooks/useEvent"; 
import StarRating from "../utils/starRating";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

interface EventListProps {
    allEvents : Event[];
}

const EventList: React.FC <EventListProps> = ({allEvents}) => {
    const {coverPhotos, fetchCoverPhotos} = useImage("");
    const navigate = useNavigate();
    const { updateInterestedEventsForUser, acceptEvent } = useEvent();
    const { user, userData } = useUser();
    const location = useLocation();
    const isHomePage = location.pathname === "/home";
    const isAcceptedPage = location.pathname === "/events/accepted" 

    useEffect(() => {
        fetchCoverPhotos()
    }, []);

    const handleEventClick = (id: string, coverPhotoUrl: string) => {
        navigate(`/event/${id}`, { state: { coverPhotoUrl } });
    };

    const handleStarClick = async (event: any, isSelected: boolean) => {
        if (!user) {
          console.error("User is not logged in.");
          return;
        }
        await updateInterestedEventsForUser(user.uid, event.id, isSelected);
    };

    const handleacceptClick = async (eventId:any) => {
        if(!user){
          return
        }
        await acceptEvent(user.uid, eventId)
    };
    

    return  (
        <div className="flex-1 overflow-y-auto min-h-0 ">
        {allEvents.length === 0 ? (
          <p className="text-center text-gray-600">
            No events yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 gap-6 p-4">
            {allEvents.map((event) => (
              <div key={event.id} className="relative group bg-gray-200 rounded-lg hover:drop-shadow-lg">
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
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gray-600 rounded-tl-lg rounded-br-lg flex flex-col items-center justify-center">
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
                <div className="mt-auto flex items-center justify-between bg-gray-200 text-black rounded-lg w-full p-2">
                    {!isAcceptedPage && 
                    <button 
                        className={`self-center bg-gray-300 ${
                          isHomePage ? "w-5/6" : "w-full"
                        }`}
                        onClick={() => handleacceptClick(event.id)}
                    >
                    Accept
                    </button>
                    }
                    {isHomePage &&
                    <StarRating
                        isInterested={userData?.interestedEvents?.includes(String(event.id)) || false}
                        onClick={(newState: boolean) => handleStarClick(event, newState)}
                    />
                    }
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
};

export default EventList