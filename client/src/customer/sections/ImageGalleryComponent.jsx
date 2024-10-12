import React, { useState, useEffect } from 'react';
// import ImageGallery from 'react-image-gallery';
import 'App.css';

const ImageGalleryComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'https://fakestoreapi.com/products.images';

    const fetchImages = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const galleryImages = data.map((item) => ({
          original: item.url,         
          thumbnail: item.thumbnail,  
        }));

        setImages(galleryImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ImageGallery items={images} />;
};

export default ImageGalleryComponent;
