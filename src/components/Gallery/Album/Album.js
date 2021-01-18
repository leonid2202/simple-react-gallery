import IconBack from 'assets/previous.svg';
import React, { useState } from 'react';
import './Album.css';

import PhotoPreview from './PhotoPreview/PhotoPreview';
import PhotoViewer from './PhotoViewer/PhotoViewer';

export default function Album({
  album, photos, setCurrentAlbum,
}) {
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const handleGoBack = () => setCurrentAlbum(null);

  const handleNext = () => {
    if (currentPhoto) {
      const currentIndex = photos.findIndex(({ id }) => id === currentPhoto.id);
      if (currentIndex !== -1 && currentIndex !== photos.length - 1) {
        setCurrentPhoto(photos[currentIndex + 1]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPhoto) {
      const currentIndex = photos.findIndex(({ id }) => id === currentPhoto.id);
      if (currentIndex !== -1 && currentIndex !== 0) {
        setCurrentPhoto(photos[currentIndex - 1]);
      }
    }
  };

  const isFirst = () => {
    return photos.findIndex(({ id }) => id === currentPhoto?.id) === 0;
  };
  const isLast = () => {
    return photos.findIndex(({ id }) => id === currentPhoto?.id) === photos.length - 1;
  };

  return album && (
    <div className='album'>
      <div className='album-top'>
        <div
          className='album-top__button-go-back'
          onClick={handleGoBack}
        >
          <img
            className='button-go-back__icon'
            src={IconBack}
            alt='arrow back'
          />
          {'Go back'}
        </div>
        <h2 className='album-top__title'>{album.title}</h2>
      </div>
      <div className='album__photos'>
        {photos.map(photo => (
          <PhotoPreview
            photo={photo}
            key={photo.id}
            setCurrentPhoto={setCurrentPhoto}
          />
        ))}
      </div>
      <PhotoViewer
        photo={currentPhoto}
        setCurrentPhoto={setCurrentPhoto}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        isLast={isLast()}
        isFirst={isFirst()}
      />
    </div>
  );
}
