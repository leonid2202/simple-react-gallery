import React from 'react';
import './Modal.css';

export default function Modal({
  isOpen, children, handleOutsideClick,
}) {
  const handleClick = () => {
    if (typeof handleOutsideClick === 'function') { handleOutsideClick(); }
  };

  return isOpen
    ? (
      <div
        className='modal'
        onClick={handleClick}
      >
        <div className='modal__content'>{children}</div>
      </div>
    )
    : null;
}
