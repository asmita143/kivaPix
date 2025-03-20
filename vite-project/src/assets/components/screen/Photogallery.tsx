import { useEffect, useState } from "react";
import SideBar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import HeaderSection from "../section/HeaderSection";
import { Upload as UploadIcon } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import useImage from "../hooks/useImage";
import AllImages from "../section/AllImagesSection";
import { QRCodeCanvas } from "qrcode.react";
import useUser from "../hooks/useUser";

const PhotoGallery = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isQrCodeExpanded, setQrCodeExpanded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { uploadImage, uploading } = useImage(id || "", "");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { isGuest, loadingUserData } = useUser();
  const navigate = useNavigate();

  const guestGalleryUrl = `${window.location.origin}/guest-gallery/${id}`;

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      await uploadImage(file, "");
    }

    setUploadedImages((prev) => [...prev, ...uploadedUrls]);
  };

  // Redirect guest users to the login page only after loading is complete
  useEffect(() => {
    if (!loadingUserData && isGuest) {
      navigate("/login");
    }
  }, [isGuest, loadingUserData, navigate]);

  // Display loading state only for logged-in users, not guests
  if (!isGuest && loadingUserData) {
    return <div>Loading user data...</div>;
  }

  // Prevent guests from accessing this page
  if (!loadingUserData && isGuest) return null;

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      {/* Header */}
      <HeaderSection />

      {/* Sidebar & Main Layout */}
      <div className="flex flex-grow bg-gray-100">
        {/* Hamburger Menu */}
        <HamburgerMenu
          setSidebarVisible={setSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />

        {/* Sidebar */}
        <div
          id="sidebar"
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white transform transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
        >
          <SideBar />
        </div>

        {/* Main Section */}
        <main className="flex flex-col p-3 w-full min-h-screen transition-all duration-300">
          {/* Title & Upload */}
          <div className="flex w-full justify-between items-center sticky top-0">
            <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              Photo Gallery
            </h1>

            {/* Upload Button */}
            {!isGuest && (
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-3 rounded-md inline-flex items-center gap-2 hover:cursor-pointer"
              >
                <UploadIcon />
                <span className="hidden sm:inline">Upload Images</span>
              </label>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {/* QR Code Section */}
          <div className="bg-white p-4 md:p-6 mt-6 rounded-lg">
            <h2 className="text-base md:text-xl font-semibold mb-4">
              Share the Gallery
            </h2>

            {/* QR Code */}
            <QRCodeCanvas
              value={guestGalleryUrl}
              size={isQrCodeExpanded ? 256 : 100} // Adjusted for better visibility
              onClick={() => setQrCodeExpanded((prev) => !prev)}
              className="hover:cursor-pointer transition-smooth"
            />

            <p className="mt-4 text-gray-500 text-sm">
              Click to expand or close the QR code.
            </p>
          </div>

          {/* Display All Images */}
          <AllImages
            uploadedImages={uploadedImages}
            uploading={uploading}
            isGuest={false}
          />
        </main>
      </div>
    </div>
  );
};

export default PhotoGallery;
