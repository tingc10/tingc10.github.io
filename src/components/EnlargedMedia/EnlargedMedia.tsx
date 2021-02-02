import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  closeMedia: () => void;
  nextMedia: () => void;
  prevMedia: () => void;
}


const EnlargedMedia: React.FC<Props> = ({
  children,
  closeMedia = () => {},
  prevMedia,
  nextMedia
}) => {
  React.useEffect(() => {
    function handleDocumentKeyUp(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        closeMedia()
      } if (e.code === 'ArrowLeft') {
        prevMedia()
      } else if (e.code === 'ArrowRight') {
        nextMedia()
      }

    }

    document.addEventListener('keyup', handleDocumentKeyUp)
    return () => {
      document.removeEventListener('keyup', handleDocumentKeyUp)
    }
  }, [closeMedia, prevMedia, nextMedia])

  return (
    <div className={styles.enlargedImageContainer}>
      <button className={styles.closeButton} onClick={closeMedia}>
        ✕
      </button>
      <figure className={styles.enlargedFigure}>{children}</figure>
    </div>
  );
};

export default EnlargedMedia;
