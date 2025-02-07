import { useParams } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { Delete, Edit, PrintRounded } from "@mui/icons-material";
import { useState } from "react";
import useImage from "../hooks/useImage";
import { PhotoEditorSDK } from "../utils/PhotoEditor";
import LoadingIndicator from "./LoadingIndicator";

interface SingleImageProps{
    singleImageAll:string | null;
    singleImagePrint:string | null;
    singleImageAllName:string | null;
    singleImagePrintName:string | null;
    onClose: () => void;
    reloadImages: () => void;
    onDelete: () => void;
}

const SingleImage = ({singleImageAll, onClose, singleImagePrint, singleImageAllName, singleImagePrintName, reloadImages, onDelete }: SingleImageProps) => {
    const { id } = useParams<{ id: string }>();
    const [editingImage, setEditingImage] = useState<string | null>();
    const [saving, setSaving] = useState(false);
    const { uploadImage, deleteImage, deleteLoading } = useImage(id || "");

    console.log(singleImageAllName, singleImagePrintName)

    const handleEdit = (url: string) => {
      setEditingImage(url);
    };

    const closeEditor = () => {
      setEditingImage(null);
    };  

    const handleDeleteImage = async (imageTodelete:string, path:string) => {
      await deleteImage(imageTodelete, path)
      onClose();
      reloadImages();
      onDelete()
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
        const fileName = editingImage.split('/').pop() || `image_${Date.now()}.png`; 
      
        const byteCharacters = atob(base64Cleaned);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });
    
        const file = new File([blob], fileName, { type: "image/png" });

        const allImagesPath = ``;
        const printImagesPath = `printImage`;
          
        if(singleImageAll){
          await uploadImage(file, allImagesPath)
          
        }else {
          await uploadImage(file, printImagesPath)
        }
      
        } catch (error) {
          console.error("Error uploading edited image:", error);
        } finally {
          setSaving(false)
          setEditingImage(null);
          onClose();
          reloadImages()
        }
    };

    return(
        <div>
          <Modal
            open={Boolean(singleImageAll || singleImagePrint)}
            onClose={onClose} 
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
                {singleImageAll && (
                <div>
                    <img
                    src={singleImageAll}
                    alt="Selected"
                    className="w-full max-h-[70vh] object-contain pb-2"
                    />
                    <div className="bottom-0 w-full h-10 bg-white flex items-center justify-between rounded-b-lg">
                        <Edit
                          onClick={() => handleEdit(singleImageAll)}
                          className="text-white p-2 bg-gray-800/60 hover:shadow-lg rounded-full bg-blue-500 cursor-pointer"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <Delete
                          className="text-white p-2 bg-gray-800/60 rounded-full bg-red-500 cursor-pointer"
                          onClick={() => {
                              if (singleImageAllName) {
                                handleDeleteImage(singleImageAllName, "");
                              }
                          } }
                          style={{ width: "40px", height: "40px" }}
                        />
                    </div>
                </div>
                )}

                {singleImagePrint && (
                <div>
                    <img
                    src={singleImagePrint}
                    alt="Selected"
                    className="w-full max-h-[70vh] object-contain pb-2"
                    />
                    <div className="bottom-0 w-full h-10 bg-white flex items-center justify-between rounded-b-lg">
                        <Edit
                          onClick={() => handleEdit(singleImagePrint)}
                          className="text-white p-2 bg-gray-800/60 hover:shadow-lg rounded-full bg-blue-500 cursor-pointer"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <PrintRounded
                          onClick={() => console.log("Image Printed")}
                          className="text-white p-2 bg-gray-800/60 hover:shadow-lg rounded-full bg-green-500 cursor-pointer"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <Delete
                          className="text-white p-2 bg-gray-800/60 rounded-full bg-red-500 cursor-pointer"
                          onClick={() => {
                            if (singleImagePrintName) {
                              handleDeleteImage(singleImagePrintName, "printImage/");
                            }
                          }}
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
                <Box>
                    {editingImage && (
                    <PhotoEditorSDK image={editingImage} onClose={closeEditor} onExport={handleExportedImage} />
                    )}
                </Box>
            </Modal>
            <LoadingIndicator uploading={false} copyImage={false} deleteLoading={deleteLoading} saving={saving} event={false} />
        </div>
    )
}
export default SingleImage;