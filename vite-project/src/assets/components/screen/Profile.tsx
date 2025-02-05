// src/pages/Profile.tsx
import useUser from "../hooks/useUser"; // Import the useUser hook
import HeaderSection from "../section/HeaderSection";
import SideBar from "../section/SideBar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, userData, loading, error, logout } = useUser(); // To store additional user data
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading user data...</p>;
  }

  // If user is not logged in, show a message or redirect to login page
  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  if (error) {
    return <p>{error}</p>; // Show error if there's any
  }

  return (
    <div className="app-container">
      <HeaderSection />
      <div className="layout flex">
        <aside className="w-64">
          <SideBar showButton={false} />
        </aside>
        <div className="bg-gradient-to-r from-gray-300 to-gray-500 min-h-screen w-full flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 text-center mb-8 md:mb-0">
                <img
                  src="https://i.pravatar.cc/300"
                  alt="Profile Picture"
                  className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-gray-700 dark:border-gray-600 transition-transform duration-300 hover:scale-105"
                />
                <h1 className="text-2xl font-bold text-black dark:text-gray-200 mb-2">
                  {userData?.name || "User"}
                </h1>
                <p className="text-gray-700 dark:text-gray-400">{user.email}</p>
                <button className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300">
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
                  {["Photographer", "Admin"].map((Role) => (
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
                  <li className="flex items-center">📧 {user.email}</li>
                  {/* Add other contact info here */}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className="w-full py-3 bg-red-500 text-white font-bold rounded-3xl text-xl"
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
