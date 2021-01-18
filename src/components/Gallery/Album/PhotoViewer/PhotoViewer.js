/* eslint-disable jsx-a11y/img-redundant-alt */ // eslint is being silly
import { ReactComponent as IconNext } from 'assets/next.svg';
import { ReactComponent as IconPrevious } from 'assets/previous.svg';
import Modal from 'components/Modal/Modal';
import React from 'react';
import './PhotoViewer.css';

export default function PhotoViewer({
  photo, setCurrentPhoto, handleNext, handlePrevious, isFirst, isLast,
}) {
  const handleOutsideClick = () => {
    setCurrentPhoto(null);
  };

  const handlePreviousClick = e => {
    e.stopPropagation();
    if (typeof handlePrevious === 'function') { handlePrevious(); }
  };

  const handleNextClick = e => {
    e.stopPropagation();
    if (typeof handleNext === 'function') { handleNext(); }
  };

  return (
    <Modal
      isOpen={photo}
      handleOutsideClick={handleOutsideClick}
    >
      <div className='photo-viewer'>
        <IconPrevious
          className={`photo-viewer__button${isFirst ? 'photo-viewer__button--hidden' : ''}`}
          onClick={handlePreviousClick}
        />
        <div
          className='photo__wrapper'
          onClick={handleNextClick}
        >
          <img
            className='photo'
            src={photo?.url}
            alt={photo?.title}
          />
        </div>

        <IconNext
          className={`photo-viewer__button${isLast ? 'photo-viewer__button--hidden' : ''}`}
          onClick={handleNextClick}
        />
      </div>
    </Modal>
  );
}
