import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  onClickClose: () => void;
}


const EnlargedMedia: React.FC<Props> = ({
  children,
  onClickClose = () => {}
}) => {
  return (
    <div className={styles.enlargedImageContainer}>
      <button className={styles.closeButton} onClick={onClickClose}>
        ✕
      </button>
      <figure className={styles.enlargedFigure}>{children}</figure>
    </div>
  );
};

export default EnlargedMedia;
