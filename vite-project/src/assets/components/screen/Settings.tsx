import { useState, ReactNode } from "react";

import "../../../App.css";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import SettingTabs from "../ui/SettingTabs";
import Box from "@mui/material/Box";
import GeneralSettings from "../section/GeneralSettings";
import useUser from "../hooks/useUser";
import ResponsiveText from "../ui/Font";

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}

const CustomTabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const Setting = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const { userData, allUsers, loadingUserData, loadingAllUsers, error } =
    useUser();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSortChange = () =>
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedUsers = [...allUsers].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingUserData || loadingAllUsers) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app-container bg-gray-100 w-full h-full flex flex-col">
      <HeaderSection />
      <div className="flex flex-grow bg-gray-100 min-h-0">
        <HamburgerMenu
          setSidebarVisible={setSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white transform transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
        >
          <Sidebar />
        </div>
        <main className="flex flex-col p-4 w-full flex-grow min-h-0 transition-all duration-300 overflow-y-auto">
          <div className="flex-grow w-full flex-col items-center justify-center p-4">
            <div className="w-full max-w-full overflow-x-auto">
              <div className="tabs-container overflow-x-auto">
                <SettingTabs value={value} onChange={handleTabChange} />
              </div>
            </div>
            <div className="bg-white w-full rounded-xl shadow-xl p-4 mt-4 flex-grow overflow-y-auto">
              <CustomTabPanel value={value} index={0}>
                <h2 className="text-lg font-semibold text-black mb-2">
                  General Settings
                </h2>
                <p className="mb-2">Update your profile details below:</p>
                <GeneralSettings />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <h2 className="text-lg font-semibold text-black mb-2">
                  Notification Settings
                </h2>
                <ResponsiveText text="Choose your preferences for email, push notifications, and more." />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <h2 className="text-lg font-semibold text-black mb-2">
                  View All Photographer Profiles
                </h2>
                <div className="mb-2 flex flex-col items-center lg:flex-row lg:items-start">
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border rounded px-3 py-2 w-full mb-2 lg:w-auto lg:mr-4"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    onClick={handleSortChange}
                  >
                    Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
                  </button>
                </div>
                <div className="bg-white dark:bg-gray-800 flex-grow overflow-auto p-2 rounded-xl shadow-2xl w-full transition-all duration-300 animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.uid}
                        className="flex flex-col lg:flex-row items-center bg-gray-100 p-3 rounded-xl shadow-lg"
                      >
                        <img
                          src={user.profilePic || "https://i.pravatar.cc/100"}
                          alt={`${user.name} Profile`}
                          className="rounded-full w-16 h-16 lg:mr-4 mb-2 lg:mb-0"
                        />
                        <div className="text-center lg:text-left">
                          <h3 className="text-base font-semibold mb-1">
                            {user.name}
                          </h3>
                          <ResponsiveText text={user.about} />
                          <p className="text-gray-600 mb-1 text-sm">
                            <strong>Email:</strong>{" "}
                            <a
                              href={`mailto:${user.email}`}
                              className="text-blue-500"
                            >
                              {user.email}
                            </a>
                          </p>
                          <p className="text-gray-600 mb-1 text-sm">
                            <strong>Phone:</strong>{" "}
                            <a
                              href={`tel:${user.phone}`}
                              className="text-blue-500"
                            >
                              {user.phone}
                            </a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <h2 className="text-lg font-semibold text-black mb-2">
                  Your Profile
                </h2>
                {userData ? (
                  <div>
                    <p>
                      <strong>Name:</strong> {userData.name}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${userData.email}`}
                        className="text-blue-500"
                      >
                        {userData.email}
                      </a>
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a
                        href={`tel:${userData.phone}`}
                        className="text-blue-500"
                      >
                        {userData.phone}
                      </a>
                    </p>
                    <ResponsiveText text={userData.about} />
                  </div>
                ) : (
                  <p>No user data available.</p>
                )}
              </CustomTabPanel>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Setting;
