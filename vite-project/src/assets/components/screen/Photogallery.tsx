import { useState } from "react";
import SideBar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import HeaderSection from "../section/HeaderSection";
import { Upload as UploadIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import useImage from "../hooks/useImage";
import AllImages from "../section/AllImagesSection";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@radix-ui/themes";

const PhotoGallery = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isQrCodeExpanded, setQrCodeExpanded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { uploadImage, uploading } = useImage(id || "", "");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      await uploadImage(file, "");
    }

    setUploadedImages((prev) => [...prev, ...uploadedUrls]);
  };

  const galleryUrl = `${window.location.origin}/PhotoGallery/${id}`;

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      {/* Header */}
      <HeaderSection />

      {/* Sidebar & Main Layout */}
      <div className="flex flex-grow bg-gray-100">
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
          <SideBar />
        </div>
        <main
          className={`flex flex-col p-3 w-full min-h-screen transition-all duration-300`}
        >
          <div className="flex w-full justify-between items-center sticky top-0">
            <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              Photo Gallery
            </h1>

            {/* Upload Button */}
            <label
              htmlFor="file-upload"
              className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-3 rounded-md inline-flex items-center gap-2 hover:cursor-pointer"
            >
              <UploadIcon />{" "}
              <span className="hidden sm:inline">Upload Images</span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {/* QR Code Section (for photographers to share the gallery) */}
          <div className="bg-white p-4 md:p-6 mt-6 rounded-lg">
            <h2 className="text-base md:text-xl font-semibold mb-4">
              Share the Gallery
            </h2>

            {/* Small QR Button that toggles the expanded view */}
            <QRCodeCanvas
              value={galleryUrl}
              size={isQrCodeExpanded ? 256 : 50}
              onClick={() => setQrCodeExpanded((prev) => !prev)}
              className="hover:cursor-pointer transition-smooth"
            />

            <p className="mt-4 text-gray-500 text-sm">
              Click to expand or close the QR code.
            </p>
          </div>

          <AllImages uploadedImages={uploadedImages} uploading={uploading} />
        </main>
      </div>
    </div>
  );
};

export default PhotoGallery;
