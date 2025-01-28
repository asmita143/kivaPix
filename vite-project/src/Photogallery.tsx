
import { useParams } from 'react-router-dom';
import useImage from './assets/components/hooks/useImage';
import { useState } from "react";
import HamburgerMenu from "./assets/components/utils/HamBurgerMenu"; // Import the HamburgerMenu
import SideBar from "./assets/components/section/SideBar"; // Assuming the Sidebar is used here

const PhotoGallery = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Sidebar toggle state
  const { eventId } = useParams<{ eventId: string }>(); 
  const { images } = useImage(eventId || ""); 

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Hamburger Menu Button */}
      <HamburgerMenu
        setSidebarVisible={setSidebarVisible}
        isSidebarVisible={isSidebarVisible}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-md transform transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`} // Sidebar hidden on mobile and always visible on large screens
      >
        <SideBar />
      </div>

      {/* Main Content */}
      <main
        className={`flex overflow-auto p-3 transition-all duration-300 ${
          isSidebarVisible ? "ml-64" : "ml-0" // Push main content when sidebar is visible
        }`}
      >
        <div className="max-h-screen overflow-y-auto bg-white">
          {/* Fixed Header */}
          <div className="sticky top-0 bg-white z-20 shadow-md">
            <div className="p-5">
              <h1 className="font-bold">Photo Gallery</h1>
            </div>
          </div>

          {/* Scrollable Grid */}
          <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Image ${index}`}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
              ))}
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Image ${index}`}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoGallery;
