import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload as UploadIcon } from "@mui/icons-material";
import useImage from "../hooks/useImage"; // Custom hook for image upload
import AllImages from "../section/AllImagesSection"; // Import the section that displays images
import useUser from "../hooks/useUser"; // Assuming useUser hook for managing user state

const GuestGallery = () => {
  const { id } = useParams<{ id: string }>();
  const { uploadImage, uploading } = useImage(id || "", ""); // Custom hook for image upload
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // State to store uploaded images
  const { isGuest, loadingUserData } = useUser(); // Guest info from useUser hook
  const navigate = useNavigate(); // Navigate hook for redirection

  // Handle file upload and update images
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      await uploadImage(file, "");
    }

    setUploadedImages((prev) => [...prev, ...uploadedUrls]);
  };

  // Redirect guest users to login if they're not authenticated
  useEffect(() => {
    if (!loadingUserData && isGuest) {
      navigate("/login"); // Redirect guest users to login
    }
  }, [isGuest, loadingUserData, navigate]);

  // Loading state or unauthorized access check
  // Only show loading state if ID is missing, not for loading user data
  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8 app-container bg-gray-100 w-screen h-screen">
      <h1 className="text-center text-xl font-bold mt-6">
        Guest Photo Gallery
      </h1>

      {/* Upload Button */}
      <div className="mt-4 text-center">
        <label
          htmlFor="file-upload"
          className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-3 rounded-md inline-flex items-center gap-2 cursor-pointer"
        >
          <UploadIcon /> Upload Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange} // Handle file upload
          style={{ display: "none" }}
        />
      </div>

      {/* Display Uploaded Images */}
      <div className="mt-6">
        <AllImages
          isGuest={true} // Set isGuest to true for guest behavior
          uploadedImages={uploadedImages} // Pass uploaded images
          uploading={uploading} // Handle uploading state (loading indicator)
        />
      </div>
    </div>
  );
};

export default GuestGallery;
