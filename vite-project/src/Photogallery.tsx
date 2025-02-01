import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import { Delete, Edit, EditLocation, EditNotifications, Upload as UploadIcon } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import useImage from "./assets/components/hooks/useImage";
import SideBar from "./assets/components/section/SideBar";
import HamburgerMenu from "./assets/components/utils/HamBurgerMenu";
import HeaderSection from "./assets/components/section/HeaderSection";
import { Modal } from "@mui/material";
import { PhotoEditorSDK } from "./PhotoEditor";

const PhotoGallery = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { images, loading } = useImage(id || "");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await new Promise<void>((resolve, reject) => {
          uploadTask.on("state_changed", null, reject, async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            uploadedUrls.push(downloadUrl);
            resolve();
          });
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setUploadedImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

    // Function to open the editor modal for a specific image
  const handleEdit = (url: string) => {
    setEditingImage(url);
  };
  
  // Function to close the editor modal
  const closeEditor = () => {
    console.log("closeEditor called");
    setEditingImage(null);
    window.location.reload();
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
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-md transform transition-transform duration-300 ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
        >
          <SideBar />
        </div>

        {/* Main Content */}
        <main
          className={`flex flex-col p-3 w-full min-h-screen transition-all duration-300 ${
            isSidebarVisible ? "lg:ml-64" : "ml-0"
          }`}
        >
          {/* Top Bar */}
          <div className="bg-green-500 flex p-4 w-full justify-between shadow-lg rounded-lg sticky top-0 z-10 shadow-lg">
            <h1 className="font-bold text-white">Photo Gallery</h1>

            {/* Upload Button */}
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                color="primary"
                startIcon={<UploadIcon />}
                component="span"
                disabled={uploading}
              >
                Upload Images
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

          {/* Image Grid */}
          <div className="w-full flex-grow mt-4 max-h-screen overflow-y-auto">
            {loading ? (
              // Show this section when loading is true
              <div className="flex items-center justify-center w-full h-[70vh] bg-gray-200">
                <CircularProgress color="primary" />
                <p className="ml-4 text-gray-700 text-xl font-medium">
                  Loading images...
                </p>
              </div>
            ) : [...images, ...uploadedImages].length === 0 ? (
              // Show this section when loading is false and no images are available
              <div className="flex items-center justify-center w-full h-[70vh] bg-white text-gray-500 text-lg font-semibold rounded-lg">
                No images available
              </div>
            ) : (
              // Show this section when images are available
              <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 bg-white p-6 rounded-lg md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full min-h-[300px]">
                
                {[...images, ...uploadedImages].map((url, index) => (
                  <div key={index} className="relative group">
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index}`}
                    className="aspect-square w-full rounded-lg object-cover group-hover:opacity-95"
                  />
                  <input
                    type="checkbox"
                    className="absolute top-1 left-1 w-5 h-5 bg-white border border-gray-400 rounded-lg cursor-pointer"
                    onChange={() => console.log('Checkbox clicked')}
                  />
                  <div className="absolute bottom-0 w-full h-10 bg-black/40 flex items-center justify-between rounded-b-lg">
                    <Edit
                      onClick={() => handleEdit(url)}
                      className="text-white p-1 bg-gray-800/60 rounded-full hover:bg-gray-600 cursor-pointer"
                      style={{ width: "32px", height: "32px" }}
                    />
                    <Delete
                      onClick={() => console.log("Delete clicked")}
                      className="text-white p-1 bg-gray-800/60 rounded-full hover:bg-red-900 cursor-pointer"
                      style={{ width: "32px", height: "32px" }}
                    />
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
        <Modal
          open={Boolean(editingImage)}
          onClose={closeEditor}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            {editingImage && (
              <PhotoEditorSDK image={editingImage} onClose={closeEditor} />
            )}
          </Box>
        </Modal>
    </div>
  );
};

export default PhotoGallery;
