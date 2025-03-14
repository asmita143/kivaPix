import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import useImage from "../hooks/useImage"; // Import the useImage hook
import HeaderSection from "../section/HeaderSection";
import SideBar from "../section/SideBar";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../utils/HamBurgerMenu";

const Profile = () => {
  const { user, userData, loadingUserData, error, logout } = useUser();
  const navigate = useNavigate();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const backgroundColor = "#939597";

  const id = user?.uid || ""; // Get the userId from the current user
  const { profilePicture, fetchProfilePicture, loading } = useImage("", id);

  useEffect(() => {
    if (id) {
      fetchProfilePicture();
    }
  }, [id]);

  if (loadingUserData || loading) {
    return <p>Loading user data...</p>;
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="app-container">
      <HeaderSection />
      <div className="layout flex">
        <HamburgerMenu
          setSidebarVisible={setSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-md transform transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
        >
          <SideBar />
        </div>
        <div className="bg-gradient-to-r from-gray-300 to-gray-500 min-h-screen w-full flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 flex-grow overflow-auto p-3 max-h-[calc(100vh-4rem)] rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 text-center mb-8 md:mb-0">
                <img
                  src={
                    profilePicture ||
                    `https://api.dicebear.com/6.x/initials/svg?seed=${
                      userData?.name || "User"
                    }&background=${backgroundColor}`
                  }
                  alt="Profile Picture"
                  className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-gray-700 dark:border-gray-600 transition-transform duration-300 hover:scale-105"
                />
                <h1 className="text-2xl font-bold text-black dark:text-gray-200 mb-2">
                  {userData?.name || "User"}
                </h1>
                <button
                  className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300"
                  onClick={() => navigate("../settings")}
                >
                  Edit Profile
                </button>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h2 className="text-xl font-semibold text-black dark:text-gray-200 mb-4">
                  About Me
                </h2>
                <p className="text-gray-800 dark:text-gray-400 mb-6">
                  {userData?.about || "No about information available."}
                </p>
                <h2 className="text-xl font-semibold text-black dark:text-gray-200 mb-4">
                  Role
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[userData?.role].map((Role) => (
                    <span
                      key={Role}
                      className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    >
                      {Role}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-black dark:text-gray-200 mb-4">
                  Contact Information
                </h2>
                <ul className="space-y-2 text-gray-800 dark:text-gray-400">
                  <li className="flex items-center">
                    <a
                      href={`mailto:${user.email}`}
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      📧 {user.email}
                    </a>
                  </li>
                  {userData?.phone && (
                    <li className="flex items-center">
                      <a
                        href={`tel:${userData.phone}`}
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        📱 {userData.phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-center lg:justify-end">
              <button
                onClick={async () => {
                  if (window.confirm("Are you sure you want to logout?")) {
                    await logout();
                    navigate("/login");
                  }
                }}
                className="flex-3 py-3 mb-5 bg-red-500 text-white font-bold rounded-3xl text-l"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
