
import { useParams } from 'react-router-dom';
import useImage from './assets/components/hooks/useImage';
import { useState } from "react";
import HamburgerMenu from "./assets/components/utils/HamBurgerMenu"; 
import SideBar from "./assets/components/section/SideBar"; 
import { Button, CircularProgress } from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';


const PhotoGallery = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false); 
  const { eventId } = useParams<{ eventId: string }>(); 
  const { images } = useImage(eventId || ""); 
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); 
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    // Loop through files and upload each one
    for (const file of Array.from(files)) {
      const storageRef = ref(storage, `VlUEwROzvUSQuj1gUm6E/${file.name}`); 
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null, 
            reject,
            async () => {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              uploadedUrls.push(downloadUrl);
              resolve();
            }
          );
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setUploadedImages((prev) => [...prev, ...uploadedUrls]); // Merge with existing images
    setUploading(false);
  };

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
        className={`flex ps-5 transition-all duration-300 ${
          isSidebarVisible ? "ml-64" : "ml-0" // Push main content when sidebar is visible
        }`}
      >
        <div className="divide-y divide-light-black-800 flex-col max-h-screen overflow-y-auto bg-white">
          {/* Fixed Header */}
          <div className="flex p-4 w-full justify-between sticky top-0 bg-white z-10 shadow-lg">
            <div >
              <h1 className="font-bold">Photo Gallery</h1>
            </div>

            <div className="self-center">
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<UploadIcon />}
                  component="span" 
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Images"}
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
          </div>

          

          {/* Scrollable Grid */}
          <div className="mx-auto w-full px-4 py-5 sm:px-6 lg:px-8 pt-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
              {[...images, ...uploadedImages].map((url, index) => (
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
      {/* Loading Popup */}
      {uploading && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg w-96 h-96 shadow-lg flex flex-col items-center justify-center">
            <CircularProgress color="primary" />
            <p className="mt-10 text-gray-700 text-xl font-medium">Uploading image...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
