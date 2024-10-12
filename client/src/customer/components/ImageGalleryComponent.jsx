// src/ImageGalleryComponent.js
import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGalleryComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example API URL; replace with your actual API endpoint
    const apiUrl = 'https://api.example.com/images';

    const fetchImages = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Transform data to the format required by react-image-gallery
        const galleryImages = data.map((item) => ({
          original: item.url,         // The URL of the full-sized image
          thumbnail: item.thumbnail,  // The URL of the thumbnail image
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
