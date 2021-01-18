import React, { useEffect, useState } from 'react';
import './AlbumPreview.css';

export default function AlbumPreview({
  album, photosCount, setCurrentAlbum,
}) {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (album) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?limit=1`)
        .then(response => response.json())
        .then(json => setPreviewUrl(json[0].thumbnailUrl));
    }
  }, [album]);

  const handleClick = () => {
    setCurrentAlbum(album);
  };

  return album && (
    <div
      className='album-preview'
      style={{ backgroundImage: `url(${previewUrl})` }}
      onClick={handleClick}
    >
      <div className='album-preview__photos-count'>
        {photosCount}
      </div>
      <div className='album-preview__title'>
        {album.title}
      </div>
    </div>
  );
}
