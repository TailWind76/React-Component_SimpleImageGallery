import React, { useState } from 'react';

const ImageGallery = ({ images, btnColor, btnSize, thumbnailsPerPage, imageSize }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenMode, setFullscreenMode] = useState(imageSize || 'medium');
  const [currentPage, setCurrentPage] = useState(1);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleFullscreenModeChange = (mode) => {
    setFullscreenMode(mode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getFullscreenImageStyles = () => {
    switch (fullscreenMode) {
      case 'small':
        return { width: '25%' };
      case 'medium':
        return { width: '50%' };
      case 'large':
        return { width: '80%' };
      default:
        return { width: '50%' };
    }
  };

  const getButtonFontSize = () => {
    switch (btnSize) {
      case 'btnsmall':
        return '12px';
      case 'btnmedium':
        return '16px';
      case 'btnlarge':
        return '20px';
      default:
        return '16px';
    }
  };

  const startIndex = (currentPage - 1) * thumbnailsPerPage;
  const endIndex = startIndex + thumbnailsPerPage;
  const currentThumbnails = images.slice(startIndex, endIndex);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        {currentThumbnails.map((image, index) => (
          <img
            key={startIndex + index}
            src={image}
            alt={`Thumbnail ${startIndex + index}`}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              margin: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleThumbnailClick(startIndex + index)}
          />
        ))}
      </div>

      {showImageModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
          }}
          onClick={handleCloseImageModal}
        >
          <div
            style={{
              ...getFullscreenImageStyles(),
              maxHeight: '90%',
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />

            <button
              onClick={handlePrevImage}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                fontSize: getButtonFontSize(),
                background: btnColor || 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                outline: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
              }}
            >
              &#8249;
            </button>
            <button
              onClick={handleNextImage}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                fontSize: getButtonFontSize(),
                background: btnColor || 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                outline: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
              }}
            >
              &#8250;
            </button>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button
          onClick={() => handleFullscreenModeChange('small')}
          className={btnSize === 'btnsmall' ? 'btnsmall' : btnSize === 'btnlarge' ? 'btnlarge' : 'btnmedium'}
        >
          Small
        </button>
        <button
          onClick={() => handleFullscreenModeChange('medium')}
          className={btnSize === 'btnsmall' ? 'btnsmall' : btnSize === 'btnlarge' ? 'btnlarge' : 'btnmedium'}
        >
          Medium
        </button>
        <button
          onClick={() => handleFullscreenModeChange('large')}
          className={btnSize === 'btnsmall' ? 'btnsmall' : btnSize === 'btnlarge' ? 'btnlarge' : 'btnmedium'}
        >
          Large
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {Array.from({ length: Math.ceil(images.length / thumbnailsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              background: currentPage === index + 1 ? 'gray' : btnColor || 'none',
              color: currentPage === index + 1 ? 'white' : 'black',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
