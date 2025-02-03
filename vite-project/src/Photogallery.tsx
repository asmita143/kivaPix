import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import { Delete, Edit, Print, Upload as UploadIcon } from "@mui/icons-material";
import useImage from "./assets/components/hooks/useImage";
import SideBar from "./assets/components/section/SideBar";
import HamburgerMenu from "./assets/components/utils/HamBurgerMenu";
import HeaderSection from "./assets/components/section/HeaderSection";
import { Modal } from "@mui/material";
import { PhotoEditorSDK } from "./PhotoEditor";
import ClearIcon from '@mui/icons-material/Clear';

const PhotoGallery = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { images, loading, uploadImage, uploading } = useImage(id || "");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  //const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    //setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      await uploadImage(file);
    }

    setUploadedImages((prev) => [...prev, ...uploadedUrls]);
    //setUploading(false);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Function to open the editor modal for a specific image
  const handleEdit = (url: string) => {
    setEditingImage(url);
    console.log(editingImage, url)
  };
  
  // Function to close the editor modal
  const closeEditor = () => {
      setEditingImage(null);
  };

  const handleCheckboxClick = (url: string) => {
    setSelectedImages((prevSelectedImages) => {
      // If the image is already selected, remove it
      if (prevSelectedImages.includes(url)) {
        return prevSelectedImages.filter((imageUrl) => imageUrl !== url);
      }
      // If the image is not selected, add it
      return [...prevSelectedImages, url];
    });
  };

  const handleExportedImage = async (editedImage: any) => {
    setSaving(true)
    console.log("Edited Image Data:", editedImage); // Check the object structure
    console.log("Type of Edited Image:", typeof editedImage);
  
    if (!editingImage) return;
    //setUploading(true);
  
    try {
      // Extract Base64 string (adjust based on object structure)
      const base64Data = editedImage?.imageData || editedImage?.src;
      if (!base64Data) {
        console.error("Error: Base64 data is not found in the exported image!");
        return;
      }
  
      // Check if the string contains the "data:image/png;base64," prefix and remove it
      const base64Cleaned = base64Data.startsWith('data:image/png;base64,') 
                            ? base64Data.split(',')[1] 
                            : base64Data;
  
      // Ensure the Base64 string is valid
      if (!/^[A-Za-z0-9+/=]+$/.test(base64Cleaned)) {
        console.error("Error: The Base64 string is not valid.");
        return;
      }
  
      // Extract file name from the original image URL
      const fileName = editingImage.split('/').pop() || `image_${Date.now()}.png`; // Keep the same name
  
      const byteCharacters = atob(base64Cleaned);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      const file = new File([blob], fileName, { type: "image/png" });

      await uploadImage(file)
  
    } catch (error) {
      console.error("Error uploading edited image:", error);
    } finally {
      //setUploading(false);
      setSaving(false)
      setEditingImage(null);
    }
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
          {selectedImages.length > 0 ? (
            <div className="flex items-center gap-4 mt-3 bg-blue-600 p-1 sm:p-2 md:p-3 rounded-lg">
              <ClearIcon 
                style={{ color:"white"}}   
                onClick={() => {
                  setSelectedImages([]); 
                  setSelectedImage(null);
                }}
              />
              <h3 className="text-base text-white">{selectedImages.length} selected</h3>
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg cursor-pointer">
                <Print />
                <p className="pr-1 hidden sm:block">Print</p>
              </div>

              <div className="flex items-center justify-between gap-2 bg-white p-1.5 rounded-md cursor-pointer hover:bg-red-200">
                <Delete style={{ color:"red"}}  />
                <p className="pr-1 text-sm text-red-500 hidden sm:block">DELETE</p>
              </div>
            </div>
          ):(
          <div className="flex p-1 sm:p-2 md:p-3 w-full justify-between items-center shadow-lg rounded-lg sticky top-0 z-10 shadow-lg">
            <h1 className="font-bolds text-base sm:text-lg md:text-xl lg:text-2xl text-black">Photo Gallery</h1>

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
          )
        }


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
              <div className=" grid grid-cols-3 gap-3 sm:grid-cols-4 bg-white p-4 rounded-lg md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 w-full ">
                
                {[...images, ...uploadedImages].map((url, index) => (
                  <div key={index} className="relative group">
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index}`}
                    className="aspect-square w-full rounded-lg object-cover group-hover:opacity-95"
                    onClick={() => handleImageClick(url)}
                  />
                  <input
                    type="checkbox"
                    className="absolute top-1 left-1 w-5 h-5 bg-white border border-gray-400 rounded-lg cursor-pointer"
                    onChange={() => handleCheckboxClick(url)} 
                  />
                </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
        <Modal
          open={Boolean(selectedImage)}
          onClose={closeModal}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              width: "80vw",
              maxWidth: "600px",
              backgroundColor: "white",
              borderRadius: 2,
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {selectedImage && (
              <div>
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full max-h-[70vh] object-contain pb-2"
                />
                  <div className="bottom-0 w-full h-10 bg-white flex items-center justify-between rounded-b-lg">
                    <Edit
                      onClick={() => handleEdit(selectedImage)}
                      className="text-white p-2 bg-gray-800/60 rounded-full bg-green-500 cursor-pointer"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <Delete
                      onClick={() => console.log("Delete clicked")}
                      className="text-white p-2 bg-gray-800/60 rounded-full bg-red-500 cursor-pointer"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
              </div>
            )}
          </Box>
        </Modal>
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
            sx={{
              width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
              height: { xs: "80vh", sm: "85vh", md: "90vh" },
              backgroundColor: "white",
            }}
          >
            {editingImage && (
              <PhotoEditorSDK image={editingImage} onClose={closeEditor} onExport={handleExportedImage} />
            )}
          </Box>
        </Modal>

      {uploading && (
        <Modal
          open={uploading}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div className="flex flex-col justify-center items-center w-64 h-64 lg:w-1/2 lg:h-1/2 md:w-96 md:h-96 bg-gray-200 rounded-lg">
            <div>
              <CircularProgress color="primary"/>
            </div>
            <div>
              <p className="p-5 text-gray-700 text-xl font-medium">
                {saving ? "Saving Image" : "Uploading Image..."}
              </p>
            </div>
          </div>
        </Modal>
        )}
    </div>
  );
};

export default PhotoGallery;
