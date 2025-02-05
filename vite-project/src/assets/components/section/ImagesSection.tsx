import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import useImage from "../hooks/useImage";
import { useParams } from "react-router-dom";
import { Delete, DeleteOutlined, Edit, Print } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import { PhotoEditorSDK } from "../utils/PhotoEditor";
import ImageToPrint from "./PrintImage";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import CollectionsIcon from '@mui/icons-material/Collections';

interface AllImagesProps {
    uploadedImages:string[] | null;
    uploading:boolean;
}

const AllImages = ({ uploadedImages = [], uploading }: AllImagesProps) => {
    const { id } = useParams<{ id: string }>();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [singleImage, setSingleImage] = useState<string | null>(null);
    const [editingImage, setEditingImage] = useState<string | null>();
    const { images, loading, uploadImage, deleteImage, fetchImages, imageNames, deleteLoading, printImagesName, fetchPrintImages } = useImage(id || "");
    const [saving, setSaving] = useState(false);
    const [copyImage, setCopyImage] = useState(false)
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        fetchImages(); 
        fetchPrintImages();
    }, [uploadedImages, activeTab]);

    console.log(printImagesName)

    const handleCopySelectedImagesToNewFolder = async () => {
        setCopyImage(true)
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
      
            // Create a reference to the new folder. For example, "printImage"
            const newFileRef = ref(storage, `printImage/${id}/${imageName}`);
      
            // Upload the blob to the new location
            await uploadBytes(newFileRef, blob);
            console.log(`Copied image ${imageName} to printImage folder`);
          } catch (error) {
            console.error(`Error copying image ${imageName}:`, error);
          }finally {
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

    const handleImageClick = (url: string, imageIndex:number) => {
        const imageName = imageNames[imageIndex];
        setSingleImage(url);
    };

    const handleDeleteSelectedImages = async () => {
        const deletePromises = selectedImages.map(img => deleteImage(img));
        await Promise.all(deletePromises);
        setSelectedImages([])
    };

    const closeModal = () => {
        setSingleImage(null);
    };

    const closeEditor = () => {
        setEditingImage(null);
    };  
    
    const handleEdit = (url: string) => {
        setEditingImage(url);
        console.log(editingImage, url)
    };

    const handleExportedImage = async (editedImage: any) => {
        setSaving(true)
        console.log("Edited Image Data:", editedImage); 
        console.log("Type of Edited Image:", typeof editedImage);
      
        if (!editingImage) return;
      
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
          setSaving(false)
          setEditingImage(null);
        }
    };

    return (
        <main
          className={`flex flex-col w-full min-h-screen transition-all duration-300`}
        >
          <div className="p-1 flex justify-between w-full">
            <div className="flex w-1/3">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <li 
                  onClick={() => setActiveTab("all")}
                  className={`transition-colors me-2 border-b-2 ${
                      activeTab === "all" ? "border-blue-600" : "border-b-transparent"
                  }`}
                  >
                  <a 
                      href="#" 
                      className="inline-flex gap-2 items-center justify-center p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-500 group"
                      aria-current="page"
                  >
                      <CollectionsIcon />
                      All Images
                  </a>
                  </li>
                  <li 
                  onClick={() => setActiveTab("print")}
                  className={`transition-colors me-2 border-b-2 ${
                      activeTab === "print" ? "border-blue-600" : "border-b-transparent"
                  }`}
                  >
                  <a 
                      href="#" 
                      className="inline-flex gap-2 items-center justify-center p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-500 group"
                  >
                      <Print />
                      Printing Queue
                  </a>
                  </li>
                </ul>
              </div>
              <div className="w-2/3 flex justify-end">
              {selectedImages.length > 0 && 
                <div className="flex items-center gap-2 p-1 sm:p-2 md:p-2 rounded-lg shadow-lg">
                    <ClearIcon
                        style={{ color:"black", cursor:"pointer", background:"white",}}   
                        onClick={() => {
                        setSelectedImages([]); 
                        }}
                    />
                    <h3 className="text-base text-black">{selectedImages.length} selected</h3>
                    <div 
                        className="flex items-center gap-2 bg-white p-1.5 rounded-lg cursor-pointer"
                        onClick={handleCopySelectedImagesToNewFolder} 
                    >
                        <Print />
                        <p className="pr-1 hidden sm:block">Print</p>
                    </div>

                    <div 
                        className="flex items-center justify-between gap-2 bg-white p-1.5 rounded-md cursor-pointer bg-red-600 hover:bg-red-500"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete the selected images?")) {
                            handleDeleteSelectedImages();
                            }
                        }}
                    >
                        <DeleteOutlined style={{ color:"black"}}  />
                        <p className="pr-1 text-sm text-black hidden sm:block">Delete</p>
                    </div>
                </div>
                }
              </div>
          </div>
          {/* Top Bar */}
          {/* Image Grid */}
          {activeTab === "all" ? (
            <div className="w-full flex-grow max-h-screen overflow-y-auto">
                {loading ? (
                // Show this section when loading is true
                <div className="flex items-center justify-center w-full h-[70vh] bg-gray-200">
                    <CircularProgress color="primary" />
                    <p className="ml-4 text-gray-700 text-xl font-medium">
                    Loading images...
                    </p>
                </div>
                ) : [...images, ...(uploadedImages ?? [])].length === 0 ? (
                // Show this section when loading is false and no images are available
                <div className="flex items-center justify-center w-full h-[70vh] bg-white text-gray-500 text-lg font-semibold rounded-lg">
                    No images available
                </div>
                ) : (
                // Show this section when images are available
                <div className=" grid grid-cols-3 gap-3 sm:grid-cols-4 bg-white p-4 rounded-lg md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 w-full ">
                    
                    {[...images, ...(uploadedImages ?? [])].map((url, index) => (
                    <div key={index} className="relative group">
                    <img
                        key={index}
                        src={url}
                        alt={`Image ${index}`}
                        className="aspect-square w-full rounded-lg object-cover group-hover:opacity-95"
                        onClick={() => handleImageClick(url, index)}
                    />
                    <input
                        type="checkbox"
                        className="absolute top-1 left-1 w-5 h-5 bg-white border border-gray-400 rounded-lg cursor-pointer"
                        checked={selectedImages.includes(imageNames[index])}
                        onChange={() => handleCheckboxClick(index)} 
                        disabled ={printImagesName.includes(imageNames[index])}
                    />
                    {printImagesName.includes(imageNames[index]) && (
                        <span className="absolute top-1 left-8 bg-green-100 text-green-700 px-1 rounded text-xs">
                        Printed
                        </span>
                    )}
                    </div>
                    ))}
                </div>
                )}
            </div>) : (
                <ImageToPrint />
            )}
          <Modal
            open={Boolean(singleImage)}
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
                {singleImage && (
                <div>
                    <img
                    src={singleImage}
                    alt="Selected"
                    className="w-full max-h-[70vh] object-contain pb-2"
                    />
                    <div className="bottom-0 w-full h-10 bg-white flex items-center justify-between rounded-b-lg">
                        <Edit
                        onClick={() => handleEdit(singleImage)}
                        className="text-white p-2 bg-gray-800/60 hover:shadow-lg rounded-full bg-green-500 cursor-pointer"
                        style={{ width: "40px", height: "40px" }}
                        />
                        <Delete
                        className="text-white p-2 bg-gray-800/60 rounded-full bg-red-500 cursor-pointer"
                        onClick={() => console.log("Delete icon clicked")}
                        style={{ width: "40px", height: "40px" }}
                        />
                    </div>
                </div>
                )}
            </Box>
            </Modal>
            
            <Modal
                open={uploading || copyImage || deleteLoading}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <div className="flex flex-col justify-center items-center w-64 h-64 lg:w-1/2 lg:h-1/2 md:w-96 md:h-96 bg-gray-200 rounded-lg">
                    <div>
                    <CircularProgress color="primary"/>
                    </div>
                    <div>
                    <p className="p-5 text-gray-700 text-xl font-medium">
                        {saving ? "Saving Image" : (copyImage ? "Sending image to printer" : (deleteLoading ? "Deleting Image" : "Uploading Image..."))}
                    </p>
                    </div>
                </div>
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
                <Box>
                    {editingImage && (
                    <PhotoEditorSDK image={editingImage} onClose={closeEditor} onExport={handleExportedImage} />
                    )}
                </Box>
            </Modal>
        </main>
    )
}

export default AllImages;