import { useNavigate } from "react-router-dom";
import "../../../App.css";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import { useState } from "react";
import SettingTabs from "../ui/SettingTabs"; // Import SettingTabs here
import Box from "@mui/material/Box";
import GeneralSettings from "../section/GeneralSettings";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
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
};

const Setting: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      {/* Top Header Section */}
      <HeaderSection />

      {/* Sidebar & Main Layout */}
      <div className="flex flex-grow bg-gray-100 min-h-0">
        {/* Hamburger Menu Button */}
        <HamburgerMenu
          setSidebarVisible={setSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white transform transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex flex-col p-3 w-full flex-grow min-h-0 transition-all duration-300">
          {/* Top Part: Sticky Header */}
          <div className="min-h-screen w-full flex-col items-center justify-center p-4">
            {/* SettingTabs */}
            <div className="w-full max-w-4xl">
              <SettingTabs value={value} onChange={handleTabChange} />
            </div>

            {/* White Content Box for Tab Content */}
            <div className="bg-white w-full rounded-xl shadow-xl p-6 mt-6">
              {/* Tab Panels */}
              <CustomTabPanel value={value} index={0}>
                {/* General Settings Content */}
                <h2 className="text-xl font-semibold text-black mb-4">
                  General Settings
                </h2>
                <p className="mb-4">Update your profile details below:</p>

                <GeneralSettings />
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                {/* Privacy Settings Content */}
                <h2 className="text-xl font-semibold text-black mb-4">
                  Privacy Settings
                </h2>
                <p>
                  Control your privacy settings, such as account visibility,
                  permissions, etc.
                </p>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                {/* Notification Settings Content */}
                <h2 className="text-xl font-semibold text-black mb-4">
                  Notification Settings
                </h2>
                <p>
                  Choose your preferences for email, push notifications, and
                  more.
                </p>
              </CustomTabPanel>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Setting;
