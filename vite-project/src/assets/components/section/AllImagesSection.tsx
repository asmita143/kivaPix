import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useImage from "../hooks/useImage";
import { useParams } from "react-router-dom";
import { DeleteOutlined, Print } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import ImageToPrint from "./PrintImage";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import CollectionsIcon from '@mui/icons-material/Collections';
import SingleImage from "./SingleImage";
import LoadingIndicator from "./LoadingIndicator";

interface AllImagesProps {
    uploadedImages:string[] | null;
    uploading:boolean;
}

const AllImages = ({ uploadedImages = [], uploading }: AllImagesProps) => {
    const { id } = useParams<{ id: string }>();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [singleImage, setSingleImage] = useState<string | null>(null);
    const [singleImageName, setSingleImageName] = useState<string | null>(null);
    const { images, loading, deleteImage, fetchImages, imageNames, deleteLoading, printImagesName, fetchPrintImages } = useImage(id || "");
    const [copyImage, setCopyImage] = useState(false)
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
        setSingleImageName(imageName);
    };

    const handleDeleteSelectedImages = async () => {
        const deletePromises = selectedImages.map(img => deleteImage(img, ""));
        await Promise.all(deletePromises);
        setSelectedImages([])
    };

    return (
        <main
          className={`flex flex-col w-full min-h-screen transition-all duration-300`}
        >
          <div className="p-1 flex justify-between w-full">
            <div className="flex w-1/2">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <li 
                  onClick={() => setActiveTab("all")}
                  className={`transition-colors me-2 border-b-2 ${
                    activeTab === "all" ? "border-blue-600" : "border-b-transparent"
                  }`}
                  >
                  <a 
                    href="#" 
                    className="inline-flex gap-1 items-center justify-center p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-500 group"
                    aria-current="page"
                  >
                    <CollectionsIcon />
                    <p className="pr-1 hidden sm:block">All Images</p>
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
                      className="inline-flex gap-1 items-center justify-center p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-500 group"
                  >
                      <Print />
                      <p className="pr-1 hidden sm:block">Printing Queue</p>
                  </a>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 flex justify-end">
              {selectedImages.length > 0 && 
                <div className="flex items-center gap-2 p-1 md:p-2 rounded-lg shadow-lg bg-[#FAF9F6]">
                    <ClearIcon
                        style={{ color:"black", cursor:"pointer", background:"white",}}   
                        onClick={() => {
                        setSelectedImages([]); 
                        }}
                    />
                    <h3 className="text-sm  hidden sm:block text-black">{selectedImages.length} selected</h3>
                    <p className="hidden sm:block">|</p>
                    <div 
                        className="flex items-center gap-2 bg-[#FDFDFD] p-1.5 rounded-lg cursor-pointer hover:shadow-lg"
                        onClick={handleCopySelectedImagesToNewFolder} 
                    >
                        <Print />
                        <p className="pr-1 hidden md:block">Print</p>
                    </div>

                    <div 
                        className="flex items-center justify-between gap-2 bg-[#FDFDFD] p-1.5 rounded-md cursor-pointer bg-red-600 hover:bg-red-500"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete the selected images?")) {
                            handleDeleteSelectedImages();
                            }
                        }}
                    >
                        <DeleteOutlined style={{ color:"black"}}  />
                        <p className="pr-1 text-sm text-black hidden md:block">Delete</p>
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
            <SingleImage 
                singleImageAll={singleImage} 
                singleImageAllName={singleImageName} 
                singleImagePrintName={null} 
                singleImagePrint={null} 
                onClose={() => setSingleImage(null)}  
                reloadImages={fetchImages}
                onDelete={() =>setSelectedImages([])}
            />
            
            <LoadingIndicator uploading={uploading} copyImage={copyImage} deleteLoading={deleteLoading} saving={false} />
        </main>
    )
}

export default AllImages;