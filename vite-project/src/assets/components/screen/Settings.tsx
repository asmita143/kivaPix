import "../../../App.css";
import HeaderSection from "../section/HeaderSection";
import Sidebar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import { useState } from "react";

const Setting: React.FC = () => {
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
          <div className="bg-gradient-to-r from-gray-300 to-gray-500 min-h-screen w-full flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 flex-grow overflow-auto p-3 max-h-[calc(100vh-4rem)] rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in ">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 text-center mb-8 md:mb-0">
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h2 className="text-xl font-semibold text-black dark:text-gray-200 mb-4">
                  Setting
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Privacy", "Admin"].map((Role) => (
                    <span
                      key={Role}
                      className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    >
                      {Role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Setting;
