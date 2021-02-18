import React from "react";
import classnames from "classnames";
import styles from "./styles.module.scss";
import {MediaSizing} from '@src/types/MediaSizing'

interface Props {
  onClick?: (e: React.MouseEvent, index: number) => void;
  customSizing?: MediaSizing[];
  className?: string;
  index: number;
}

const MediaPreviewTile: React.FC<Props> = ({
  children,
  className,
  customSizing = [],
  onClick,
  index
}) => {
  const classNames = classnames(
    className,
    styles.container,
    ...customSizing.map(sizing => styles[sizing])
  )

  function handleClick(e: React.MouseEvent) {
    if (onClick) {
      onClick(e, index);
    }
  }

  const Media = () => (
    <figure className={styles.mediaContainer}>
      {children}
    </figure>
  )

  return onClick ? (
    <button onClick={handleClick} className={classNames}>
      <Media />
    </button>
  ) : (
    <div className={classNames}>
      <Media />
    </div>
  );
};

export default MediaPreviewTile;
