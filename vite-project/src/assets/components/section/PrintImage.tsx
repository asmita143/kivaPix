import { CircularProgress } from "@mui/material"
import useImage from "../hooks/useImage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleImage from "./SingleImage";

const ImageToPrint = () => {
    const { id } = useParams<{ id: string }>();
    const { printImages, loading, fetchPrintImages, printImagesName, deleteLoading} = useImage(id || "");
    const [singleImagePrint, setSingleImagePrint] = useState<string | null>(null);
    const [singleImagePrintName, setSingleImagePrintName] = useState<string | null>(null);

    useEffect(() => {
        fetchPrintImages(); 
    }, []);
    
    const handleImageClick = (url: string, imageIndex:number) => {
        const imageName = printImagesName[imageIndex];
        setSingleImagePrint(url);
        setSingleImagePrintName(imageName);
    };

    return (
        <main>
            <div className="w-full flex-grow max-h-screen overflow-y-auto">
                {loading ? (
                // Show this section when loading is true
                <div className="flex items-center justify-center w-full h-[70vh] bg-gray-200">
                    <CircularProgress color="primary" />
                    <p className="ml-4 text-gray-700 text-xl font-medium">
                    Loading images...
                    </p>
                </div>
                ) : printImages.length === 0 ? (
                // Show this section when loading is false and no images are available
                <div className="flex items-center justify-center w-full h-[70vh] bg-white text-gray-500 text-lg font-semibold rounded-lg">
                    No images to print
                </div>
                ) : (
                // Show this section when images are available
                <div className=" grid grid-cols-3 gap-3 sm:grid-cols-4 bg-white p-4 rounded-lg md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 w-full ">
                    {printImages.map((url, index) => (
                        <div key={index} className="relative group">
                        <img
                            src={url}
                            alt={`Image ${index}`}
                            className="aspect-square w-full rounded-lg object-cover group-hover:opacity-95"
                            onClick={() => handleImageClick(url, index)}
                        />
                        <input
                            type="checkbox"
                            className="absolute top-1 left-1 w-5 h-5 bg-white border border-gray-400 rounded-lg cursor-pointer"
                        />
                        </div>
                    ))}
                </div>
                )}
            </div>
            <SingleImage 
                singleImageAll={null} 
                singleImagePrint={singleImagePrint} 
                singleImageAllName={null} 
                singleImagePrintName={singleImagePrintName} 
                onClose={() => setSingleImagePrint(null)}  
                reloadImages={fetchPrintImages}
            />
        </main>

    )
};

export default ImageToPrint;