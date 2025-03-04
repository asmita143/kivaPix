import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AllImages from "../section/AllImagesSection";

const QRGallery = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    // Check if the user accessed the gallery through a QR code
    if (sessionStorage.getItem("qrAccess") !== "true") {
      navigate("/"); // Redirect non-QR users to home
    } else {
      // Load gallery images based on the token
      fetchGalleryImages(token);
    }
  }, [token, navigate]);

  const fetchGalleryImages = async (token: string | undefined) => {
    // Replace this with your actual API call to fetch the gallery by token
    // Mock fetch images
    if (token === "valid_token") {
      setUploadedImages(["image1.jpg", "image2.jpg", "image3.jpg"]);
    }
  };

  return (
    <div className="app-container bg-gray-100 w-screen h-screen flex flex-col">
      {/* Header (for QR User) */}
      <div className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Photo Gallery (View-Only)</h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-grow bg-gray-100">
        <main className="flex flex-col p-3 w-full min-h-screen transition-all duration-300">
          <div className="bg-white p-4 md:p-6 mt-6 rounded-lg shadow-lg">
            <h2 className="text-base md:text-2xl font-bold mb-4 text-gray-800">
              View-Only Photo Gallery
            </h2>
            <p className="text-gray-600 mb-4">
              You are viewing the gallery with QR access. You cannot upload or
              modify the content.
            </p>

            <AllImages uploadedImages={uploadedImages} uploading={false} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default QRGallery;
