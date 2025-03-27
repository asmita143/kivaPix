import { useNavigate } from "react-router-dom";
import "../../../App.css";
import useEvent from "../hooks/useEvent";
import useUser from "../hooks/useUser";
import useImage from "../hooks/useImage";
import imageNotAvailable from "../../images/NotAvailable.png";
import { NotificationsActive } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { MainLayout } from "../layout/MainLayout";

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const { coverPhotos } = useImage("", "");
  const { events, clearNotifications, loading } = useEvent();
  const { userData, userId } = useUser();

  const notifiicationId: string[] = userData?.notifications || [];

  const showNotifications = events.filter((event) =>
    notifiicationId.includes(String(event.id))
  );

  const handleEventClick = (id: string, coverPhotoUrl: string) => {
    navigate(`/event/${id}`, { state: { coverPhotoUrl } });
  };

  const clearAllNotifications = async () => {
    if (userId) {
      await clearNotifications(userId);
      window.location.reload();
    }
  };

  return (
    <div className="app-container bg-gray-100 h-screen flex flex-colitems">
      <MainLayout>
        {" "}
        {/* Main Content */}
        <main className="p-3 flex justify-center w-full min-h-0 transition-all duration-300">
          {/* Top Part: Sticky Header */}
          <div className="flex-col w-full md:w-1/2">
            <div className="sticky top-0 bg-white rounded-lg p-2 md:p-3 ">
              <div className="flex justify-between border-b-2 border-orange-200">
                <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black pb-2">
                  Notification
                </h1>
                {showNotifications.length > 0 && (
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                    onClick={clearAllNotifications}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {showNotifications.length === 0 ? (
                    <div className="bg-[#FAF9F6] text-black p-4 mt-5 flex justify-center">
                      <div className="flex self-center">
                        <p className="self-center">No new Notifications</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      {showNotifications.map((e) => (
                        <div className="flex items-center gap-4 p-4 bg-blue-50 hover:shadow-lg transition-shadow duration-300 border-b-2 border-black-200">
                          {/* Notification Icon */}
                          <div className="p-3 bg-blue-100 rounded-full">
                            <NotificationsActive className="text-blue-600" />
                          </div>

                          {/* Notification Text */}
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() =>
                              e.id &&
                              handleEventClick(
                                e.id,
                                coverPhotos[String(e.id)] || imageNotAvailable
                              )
                            }
                          >
                            <p className="text-gray-700 font-bold">
                              🎉 New Event Alert! 🎉{" "}
                            </p>
                            <p className="mt-1 text-sm text-gray-600 ">
                              {e.name} is taking place at {e.location.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
};

export default Notification;
