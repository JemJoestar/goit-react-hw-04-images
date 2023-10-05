import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { axiosPixabeyFetch } from 'components/Api/PixabeyApi';
import { SeeMoreBtn } from './SeeMoreBtn';
import * as basicLightbox from 'basiclightbox';
import { Modal } from './Modal/Modal';
import { PhotoList } from './PhotoList';
import css from './ImageFinder.module.css';

export const ImageFinder = () => {
  const [photos, setPhotos] = useState(null);
  const [currentRequest, setCurrentRequest] = useState('');
  const [page, setPage] = useState(1);
  const [renderSeeMoreBtn, setSeeMoreBtn] = useState(false);
  const [canRenderPhotos, setCanRenderPhotos] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [modalControls, setModalControls] = useState(null);

  const newRequest = ({ event, searchReq }) => {
    event.preventDefault();
    if (searchReq === '') {
      return;
    }
    setCurrentRequest(searchReq);
  };

  // const loadPhotos = async () => {
  //   const newData = await axiosPixabeyFetch(currentRequest, page);
  //   console.log(`page:`, page);
  //   setTotalHits(newData.totalHits);
  //   const newPhotos = newData.hits;
  //   addNewPhotosToState(newPhotos);
  // }
  const loadPhotos = useCallback(
    async currentPage => {
      const newData = await axiosPixabeyFetch(currentRequest, currentPage);
      console.log(`page:`, currentPage);
      setTotalHits(newData.totalHits);
      const newPhotos = newData.hits;
      addNewPhotosToState(newPhotos);
    },
    [currentRequest]
  );

  const addNewPhotosToState = newPhotos => {
    setPhotos(prevState => [...(prevState ?? []), ...newPhotos]);
    setPage(prevState => prevState + 1);
    console.log(newPhotos);
  };

  const handleClick = async ({ event, bigImgUrl }) => {
    const modal = basicLightbox.create(Modal({ bigImgUrl }));

    modal.show();
    setModalControls(modal);
    console.log(modalControls);

    document
      .querySelector('.modal')
      .addEventListener('click', closeModalByClick);
    window.addEventListener('keydown', closeModalByEsc);
  };

  const closeModalByClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const closeModalByEsc = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalControls(prevState => {
      prevState.close();
      return null;
    });
    document.querySelector('.modal').removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModalByEsc);
  };

  const loadPhotosByClickSeeMore = () =>{
    loadPhotos(page)
  }

  useEffect(() => {
    if (currentRequest !== '') {
      setPhotos(null);
      setPage(1);
      loadPhotos(1);
    }
  }, [currentRequest, loadPhotos]);

  useEffect(() => {
    if ((photos ?? []).length > 0) {
      setCanRenderPhotos(true);
    }
  }, [photos]);

  useEffect(() => {
    if (page > 1 && totalHits / 12 > page && renderSeeMoreBtn !== true) {
      setSeeMoreBtn(true);
    } else if (renderSeeMoreBtn === true && totalHits / 12 < page) {
      setSeeMoreBtn(false);
    }
  }, [photos, page, renderSeeMoreBtn, totalHits]);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={newRequest} />
      {canRenderPhotos && <PhotoList photos={photos} onClick={handleClick} />}
      {renderSeeMoreBtn && <SeeMoreBtn onSeeMore={loadPhotosByClickSeeMore} />}
    </div>
  );
};
