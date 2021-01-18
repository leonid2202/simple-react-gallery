import React, { useEffect, useState } from 'react';
import './Gallery.css';

import Album from './Album/Album';
import AlbumPreview from './AlbumPreview/AlbumPreview';

export default function Gallery() {
  const [users, setUsers] = useState(null);
  const [albumsByUser, setAlbumsByUser] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setUsers(json))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (users) {
      Promise.all(users.map(user =>
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
          .then(response => response.json())
          .then(json => ({
            userId: user.id,
            albums: json,
          }))))
        .then(results => setAlbumsByUser(results))
        .catch(error => console.log(error));
    }
  }, [users]);

  useEffect(() => {
    if (albumsByUser) {
      const albumsArray = (albumsByUser.map(({ albums }) => albums)).flat();
      Promise.all(albumsArray.map(album =>
        fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
          .then(response => response.json())
          .then(json => ({
            albumId: album.id,
            photos: json,
          }))))
        .then(results => setPhotos(results))
        .catch(error => console.log(error));
    }
  }, [albumsByUser]);

  const isLoaded = () => users && albumsByUser && photos;

  return isLoaded() && (
    <div className='gallery__wrapper'>
      <Album
        album={currentAlbum}
        photos={photos.find(({ albumId }) => albumId === currentAlbum?.id)?.photos}
        setCurrentAlbum={setCurrentAlbum}
      />
      <div className={`gallery__user-albums ${currentAlbum ? 'gallery__user-albums--hidden' : ''}`}>
        {users.map(user => (
          <div
            className='user-albums__wrapper'
            key={user.id}
          >
            <h2 className='user-albums__header'>
              {user.name}
            </h2>
            <div className='user-albums__previews'>
              {albumsByUser
                .find(({ userId }) => userId === user.id)?.albums
                ?.map(album => (
                  <AlbumPreview
                    album={album}
                    photosCount={photos.find(({ albumId }) => albumId === album.id)?.photos?.length}
                    setCurrentAlbum={setCurrentAlbum}
                    key={album.id}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
