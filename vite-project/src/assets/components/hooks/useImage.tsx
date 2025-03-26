import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../firebase";
import { useState } from "react";

const useImage = (eventId: string, id: string) => {
  const [images, setImages] = useState<string[]>([]);
  const [printImages, setPrintImages] = useState<string[]>([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [profilePictures, setProfilePictures] = useState<{
    [userId: string]: string;
  }>({});
  const [profilePictureName, setProfilePictureName] = useState<string | null>(
    null
  );
  const [coverPhotos, setCoverPhotos] = useState<{ [eventId: string]: string }>(
    {}
  );
  const [coverPhotosCache, setCoverPhotosCache] = useState<{
    [eventId: string]: string;
  }>({});
  const [printImagesName, setPrintImagesName] = useState<string[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: any, path: any) => {
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

  const uploadProfilePicture = async (file: any) => {
    if (!file) return;
    setUploading(true);
    try {
      const fileRef = ref(storage, `profilePictures/${id}/${file.name}`);
      await uploadBytes(fileRef, file);
      console.log("Profile picture uploaded:", file.name);

      // Fetch the profile picture URL
      const url = await getDownloadURL(fileRef);
      setProfilePicture(url);
      setProfilePictureName(file.name);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
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
      const urls = await Promise.all(
        imageList.items.map((itemRef) => getDownloadURL(itemRef))
      );
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

      const urls = await Promise.all(
        imageList.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setPrintImages(urls);
    } catch (error) {
      console.error("Error fetching print images:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoverPhotos = async () => {
    if (Object.keys(coverPhotosCache).length > 0) {
      setCoverPhotos(coverPhotosCache);
      return;
    }
    setLoading(true);
    try {
      const folderRef = ref(storage, "coverPhotos");
      const listResult = await listAll(folderRef);

      const subFolderPromises = listResult.prefixes.map(
        async (subFolderRef) => {
          const subFolderList = await listAll(subFolderRef);
          if (subFolderList.items.length > 0) {
            const fileRef = subFolderList.items[0];
            const url = await getDownloadURL(fileRef);
            return { [subFolderRef.name]: url };
          }
          return null;
        }
      );

      const subFolderResults = await Promise.all(subFolderPromises);

      const mapping = subFolderResults
        .filter((result) => result !== null)
        .reduce((acc, result) => {
          Object.assign(acc, result!);
          return acc;
        }, {} as { [eventId: string]: string });
      setCoverPhotos(mapping);
      setCoverPhotosCache(mapping);
    } catch (error) {
      console.error("Error fetching cover photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilePicture = async () => {
    setLoading(true);
    try {
      const folderRef = ref(storage, `profilePictures/${id}`);
      const imageList = await listAll(folderRef);

      if (imageList.items.length > 0) {
        const profilePicRef = imageList.items[0];
        const url = await getDownloadURL(profilePicRef);
        setProfilePicture(url);
        setProfilePictureName(profilePicRef.name);
      }
      console.log(profilePictureName);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProfilePictures = async () => {
    setLoading(true);
    try {
      const folderRef = ref(storage, "profilePictures");
      const listResult = await listAll(folderRef);

      const profilePicturePromises = listResult.prefixes.map(
        async (subFolderRef) => {
          const userId = subFolderRef.name;
          const subFolderList = await listAll(subFolderRef);
          if (subFolderList.items.length > 0) {
            const fileRef = subFolderList.items[0];
            const url = await getDownloadURL(fileRef);
            return { [userId]: url };
          }
          return null;
        }
      );

  const profilePictureResults = await Promise.all(profilePicturePromises);
    const mapping = profilePictureResults
        .filter((result) => result !== null)
        .reduce((acc, result) => {
          Object.assign(acc, result!);
          return acc;
        }, {} as { [userId: string]: string });
      setProfilePictures(mapping);
    } catch (error) {
      console.error("Error fetching profile pictures:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageName: string, path: string) => {
    setDeleteLoading(true);
    try {
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

  const deleteProfilePicture = async () => {
    if (!profilePictureName) return;
    setLoading(true);
    try {
      const fileRef = ref(
        storage,
        `profilePictures/${id}/${profilePictureName}`
      );
      await deleteObject(fileRef);
      console.log("Profile picture deleted:", profilePictureName);

      setProfilePicture(null);
      setProfilePictureName(null);
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    } finally {
      setLoading(false);
    }
  };
  const getUploadedImages = async () => {
    await fetchImages(); // ✅ Refresh state by fetching images
    return images; // ✅ Return updated images
  };

  return {
    images,
    imageNames,
    loading,
    uploading,
    uploadImage,
    deleteImage,
    fetchImages,
    fetchPrintImages,
    fetchCoverPhotos,
    coverPhotos,
    coverPhotosCache,
    printImages,
    printImagesName,
    deleteLoading,
    profilePicture,
    uploadProfilePicture,
    fetchProfilePicture,
    deleteProfilePicture,
    profilePictures,
    fetchAllProfilePictures,
    getUploadedImages,
  };
};

export default useImage;
