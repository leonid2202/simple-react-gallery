import React from 'react';
import './PhotoPreview.css';

export default function PhotoPreview({ photo, setCurrentPhoto }) {
  const handleClick = () => {
    setCurrentPhoto(photo);
  };

  return photo && (
    <div
      className='photo-preview'
      onClick={handleClick}
    >
      <img
        className='photo-preview__image'
        src={photo.thumbnailUrl}
        alt='preview'
      />
    </div>
  );
}
