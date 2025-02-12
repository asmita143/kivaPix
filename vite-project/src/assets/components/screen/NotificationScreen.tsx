import "../../../App.css";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import { useState } from "react";

const Notification: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-colitems">
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
          <div className="sticky top-0 flex-none bg-white shadow-sm rounded-lg p-2 md:p-3">
            <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              Notification
            </h1>
          </div>
          {/* Bottom Part: Scrollable Grid View */}
          <div className="h-screen flex items-center justify-center">
            <p className="">No New Notification</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notification;
