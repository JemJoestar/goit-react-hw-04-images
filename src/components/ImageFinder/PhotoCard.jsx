import css from "./ImageFinder.module.css"

export const PhotoCard = ({ photo, onClick }) => {
  
  return (
    <li
      onClick={event => onClick({ event, bigImgUrl: photo.largeImageURL })}
      className={css.photoListItem}
    >
      <img src={photo.webformatURL} alt={photo.tags} />
    </li>
  );
};
