import css from './ImageFinder.module.css';
import { PhotoCard } from './PhotoCard';

export const PhotoList = ({ photos, onClick }) => {
  return (
    <ul className={css.photoList}>
      {photos.map(photo => (
        <PhotoCard key={photo.id} photo={photo} onClick={onClick}/>
      ))}
    </ul>
  );
};
