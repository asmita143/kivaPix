import { deleteObject, getDownloadURL, listAll, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { useCallback, useEffect, useState } from 'react';

const useImage = (eventId: string) => {

    const [images, setImages] = useState<string[]>([]);
    const [imageNames, setImageNames] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

      const uploadImage = async (file:any) => {
        if (!file) return;
        setUploading(true);
        try {
          const fileRef = ref(storage, `${eventId}/${file.name}`);
          await uploadBytes(fileRef, file);
          console.log("Uploaded:", file.name);
    
          // Fetch images again to update state
          await fetchImages();

        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setUploading(false);
        }
      };

      const fetchImages = async () => {
        setLoading(true);
        try {
          const folderRef = ref(storage, `${eventId}`);
          const imageList = await listAll(folderRef);
    
          // Fetch Names
          const names = imageList.items.map((itemRef) => itemRef.name);
          setImageNames(names);
    
          // Fetch URLs
          const urls = await Promise.all(imageList.items.map((itemRef) => getDownloadURL(itemRef)));
          setImages(urls);
    
        } catch (error) {
          console.error("Error fetching images:", error);
        } finally {
          setLoading(false);
        }
      };

      const deleteImage = async (imageName:string) => {
        setLoading(true);
        try {
          console.log(imageName)
          const filePath = `${eventId}/${imageName}`;
          const imageRef = ref(storage, filePath);
          await deleteObject(imageRef);
          console.log("Deleted:", imageName);
    
          // Fetch images again to update state
          await fetchImages();
        } catch (error) {
          console.error("Error deleting image:", error);
        } finally {
          setLoading(false);
        }
      };
      
      return { images,imageNames, loading, uploading, uploadImage, deleteImage, fetchImages };
}

export default useImage;