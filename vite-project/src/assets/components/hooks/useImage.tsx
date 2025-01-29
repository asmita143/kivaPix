import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../../firebase';
import { useEffect, useState } from 'react';

const useImage = (eventId: string) => {

    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

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
      return { images, loading }
}

export default useImage;