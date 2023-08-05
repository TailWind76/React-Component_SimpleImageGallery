import React from 'react';
import ImageGallery from './components/ImageGallery';
import './App.css';
import img1 from './components/images/1.webp';
import img2 from './components/images/2.jpg';
import img3 from './components/images/3.jpg';
import img4 from './components/images/4.jpg';
import img5 from './components/images/5.webp'; 

const App = () => {
  const images = [img1, img2, img3, img4, img5];

  return (
    <div className="app">
      <h1>Image Gallery</h1>
      <ImageGallery btnColor="" imageSize="small"  thumbnailsPerPage="4" btnSize="btnlarge" images={images} />
    </div>
  );
};

export default App;
