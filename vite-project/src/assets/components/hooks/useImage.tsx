import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase';
import { useState } from 'react';

const useImage = (eventId: string) => {

    const [images, setImages] = useState<string[]>([]);
    const [printImages, setPrintImages] = useState<string[]>([]);
    const [coverPhotos, setCoverPhotos] = useState<{ [eventId: string]: string }>({});
    const [printImagesName, setPrintImagesName] = useState<string[]>([]);
    const [imageNames, setImageNames] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

      const uploadImage = async (file:any, path:any) => {
        if (!file) return;
        setUploading(true);
        try {
          const fileRef = ref(storage, `${path}/${eventId}/${file.name}`);
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

      const fetchPrintImages = async () => {
        setLoading(true);
        try {
          const folderRef = ref(storage, `printImage/${eventId}`);
          const imageList = await listAll(folderRef);
    
          const names = imageList.items.map((itemRef) => itemRef.name);
          setPrintImagesName(names);

          // Fetch URLs
          const urls = await Promise.all(imageList.items.map((itemRef) => getDownloadURL(itemRef)));
          setPrintImages(urls);
    
        } catch (error) {
          console.error("Error fetching images:", error);
        } finally {
          setLoading(false);
        }
      };

      const fetchCoverPhotos = async () => {
        setLoading(true);
        try {
          const folderRef = ref(storage, 'coverPhotos');
          const listResult = await listAll(folderRef);
          const mapping: { [eventId: string]: string } = {};
          
          for (const subFolderRef of listResult.prefixes) {
            const subFolderList = await listAll(subFolderRef);
            if (subFolderList.items.length > 0) {
              const fileRef = subFolderList.items[0];
              const url = await getDownloadURL(fileRef);
              mapping[subFolderRef.name] = url;
            }
          }
          console.log("Cover Photos Mapping:", mapping);
          setCoverPhotos(mapping);
        } catch (error) {
          console.error("Error fetching cover photos:", error);
        } finally {
          setLoading(false);
        }
      };

      const deleteImage = async (imageName:string, path:string) => {
        setDeleteLoading(true);
        try {
          console.log(imageName)
          const filePath = `${path}/${eventId}/${imageName}`;
          const imageRef = ref(storage, filePath);
          await deleteObject(imageRef);
          console.log("Deleted:", imageName);
    
          await fetchImages();
        } catch (error) {
          console.error("Error deleting image:", error);
        } finally {
          setDeleteLoading(false);
        }
      };
      
      return { images,imageNames, loading, uploading, uploadImage, deleteImage, fetchImages, fetchPrintImages, fetchCoverPhotos, coverPhotos, printImages, printImagesName, deleteLoading };
}

export default useImage;