import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useImage from "../hooks/useImage";
import { useParams } from "react-router-dom";
import { ClearOutlined, DeleteOutlined, Print } from "@mui/icons-material";
import ImageToPrint from "./PrintImage";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import CollectionsIcon from "@mui/icons-material/Collections";
import SingleImage from "./SingleImage";
import LoadingIndicator from "./LoadingIndicator";

interface AllImagesProps {
  uploadedImages: string[] | null;
  uploading: boolean;
}

const AllImages = ({ uploadedImages = [], uploading }: AllImagesProps) => {
  const { id } = useParams<{ id: string }>();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [singleImage, setSingleImage] = useState<string | null>(null);
  const [singleImageName, setSingleImageName] = useState<string | null>(null);
  const {
    images,
    loading,
    deleteImage,
    fetchImages,
    imageNames,
    deleteLoading,
    printImagesName,
    fetchPrintImages,
  } = useImage(id || "", "");
  const [copyImage, setCopyImage] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchImages();
  }, [uploadedImages]);

  useEffect(() => {
    fetchPrintImages();
  }, [copyImage]);

  useEffect(() => {
    fetchImages();
    fetchPrintImages();
  }, [activeTab]);

  console.log(printImagesName);

  const handleCopySelectedImagesToNewFolder = async () => {
    setCopyImage(true);
    const storage = getStorage(); // Get the Firebase Storage instance

    for (const imageName of selectedImages) {
      // Get the corresponding image URL
      const index = imageNames.indexOf(imageName);
      if (index === -1) continue; // Skip if not found
      const imageUrl = images[index];

      try {
        // Fetch the image as a blob
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.error(`Failed to fetch image ${imageName}`);
          continue;
        }
        const blob = await response.blob();

        const newFileRef = ref(storage, `printImage/${id}/${imageName}`);

        // Upload the blob to the new location
        await uploadBytes(newFileRef, blob);
        console.log(`Copied image ${imageName} to printImage folder`);
      } catch (error) {
        console.error(`Error copying image ${imageName}:`, error);
      } finally {
        setCopyImage(false);
      }
    }
    setSelectedImages([]);
  };

  const handleCheckboxClick = (imageIndex: number) => {
    const imageName = imageNames[imageIndex];
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageName)
        ? prevSelected.filter((name) => name !== imageName)
        : [...prevSelected, imageName]
    );
  };

  const handleUnchekImages = () => {
    console.log("clicked");
    setSelectedImages([]);
  };

  const handleImageClick = (url: string, imageIndex: number) => {
    const imageName = imageNames[imageIndex];
    setSingleImage(url);
    setSingleImageName(imageName);
  };

  const handleDeleteSelectedImages = async () => {
    const deletePromises = selectedImages.map((img) => deleteImage(img, ""));
    await Promise.all(deletePromises);
    setSelectedImages([]);
  };

  return (
    <main className="flex flex-col w-full min-h-screen transition-all duration-300 bg-gray-100 p-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex space-x-4 p-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CollectionsIcon className="mr-2" />
            <span className="hidden sm:inline">All Images</span>
          </button>
          <button
            onClick={() => setActiveTab("print")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "print"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Print className="mr-2" />
            <span className="hidden sm:inline">Printing Queue</span>
          </button>
        </div>

        {selectedImages.length > 0 && (
          <div className="flex items-center space-x-4 bg-white p-1 rounded-lg shadow-md mt-4 sm:mt-0">
            <ClearOutlined
              style={{ color: "black", cursor: "pointer", font: "revert" }}
              onClick={handleUnchekImages}
            />
            <p className="text-xs sm:text-sm text-gray-700">
              {selectedImages.length} selected
            </p>
            <button
              onClick={handleCopySelectedImagesToNewFolder}
              className="flex items-center space-x-2 hover:bg-blue-400 text-black sm:px-4 sm:py-2 border-black rounded-lg transition duration-300 text-xs sm:text-sm "
            >
              <Print />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete the selected images?"
                  )
                ) {
                  handleDeleteSelectedImages();
                }
              }}
              className="flex items-center space-x-2 bg-red-600 text-white sm:px-4 sm:py-2 rounded-lg hover:bg-red-700 transition duration-300 text-xs sm:text-sm "
            >
              <DeleteOutlined />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Image Grid */}
      {activeTab === "all" ? (
        <div className="w-full flex-grow overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center w-full h-[70vh]">
              <CircularProgress color="primary" />
              <p className="ml-4 text-gray-700 text-xl font-medium">
                Loading images...
              </p>
            </div>
          ) : [...images, ...(uploadedImages ?? [])].length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-[70vh] bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">
                No images available
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[...images, ...(uploadedImages ?? [])].map((url, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={url}
                    alt={`Image ${index}`}
                    className="aspect-square w-full object-cover cursor-pointer"
                    onClick={() => handleImageClick(url, index)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="absolute top-2 left-2 w-5 h-5 bg-white border border-gray-400 rounded-lg cursor-pointer"
                      checked={selectedImages.includes(imageNames[index])}
                      onChange={() => handleCheckboxClick(index)}
                      disabled={printImagesName.includes(imageNames[index])}
                    />
                    {printImagesName.includes(imageNames[index]) && (
                      <span className="absolute top-2 right-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        Printed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <ImageToPrint />
      )}

      {/* Single Image Modal */}
      <SingleImage
        singleImageAll={singleImage}
        singleImageAllName={singleImageName}
        singleImagePrintName={null}
        singleImagePrint={null}
        onClose={() => setSingleImage(null)}
        reloadImages={fetchImages}
        onDelete={() => setSelectedImages([])}
      />

      {/* Loading Indicator */}
      <LoadingIndicator
        uploading={uploading}
        copyImage={copyImage}
        deleteLoading={deleteLoading}
        saving={false}
        event={false}
      />
    </main>
  );
};

export default AllImages;
