import { useState } from "react";
import SideBar from "../section/SideBar";
import HamburgerMenu from "../utils/HamBurgerMenu";
import HeaderSection from "../section/HeaderSection";
import { Upload as UploadIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import useImage from "../hooks/useImage";
import AllImages from "../section/AllImagesSection";

const PhotoGallery = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { uploadImage, uploading } = useImage("", id || "");
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
          <div className="flex p-2 md:p-3 w-full justify-between items-center shadow-lg rounded-lg sticky top-0 shadow-sm">
            <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              Photo Gallery
            </h1>

            {/* Upload Button */}
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                color="primary"
                startIcon={<UploadIcon />}
                component="span"
                disabled={uploading}
                className="px-2 sm:px-4"
              >
                <span className="hidden sm:inline">Upload Images</span>
              </Button>
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
          <AllImages uploadedImages={uploadedImages} uploading={uploading} />
        </main>
      </div>
    </div>
  );
};

export default PhotoGallery;
