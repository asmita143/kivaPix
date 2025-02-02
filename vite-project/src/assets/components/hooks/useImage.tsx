import { getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import { useEffect, useState } from 'react';

const useImage = (eventId: string) => {

    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

      useEffect(() => {
        const fetchImagesFromStorage = async () => {
          setLoading(true);
          try {
            const imagesRef = ref(storage, `${eventId}`); 
            const imageList = await listAll(imagesRef);
    
            // Get download URLs for all items in the folder
            const urls = await Promise.all(
              imageList.items.map((itemRef) => getDownloadURL(itemRef))
            );
            
            setImages(urls); 
            
          } catch (error) {
            console.error("Error fetching images from Firebase Storage:", error);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchImagesFromStorage();
      }, []);

      const uploadImage = async (file: File) => {
        setUploading(true);
        try {
          const fileRef = ref(storage, `${eventId}/${file.name}`);
          const uploadTask = uploadBytesResumable(fileRef, file);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Optionally track upload progress here
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error("Error uploading image:", error);
            },
            async () => {
              // Get the download URL after the upload is complete
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setImages((prevImages) => [...prevImages, downloadURL]); // Add the new URL to the state
            }
          );
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setUploading(false);
        }
      };
      
      return { images, loading, uploading, uploadImage };
}

export default useImage;