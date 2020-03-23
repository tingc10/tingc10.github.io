import React from "react";
import classnames from "classnames";
import styles from "./styles.module.scss";

export enum MediaSizing {
  LargeHorizontal = "large-horizontal",
  LargeVertical = "large-vertical"
}

interface Props {
  onClick: (e: React.MouseEvent, index: number) => void;
  customSizing?: MediaSizing[];
  className?: string;
  index: number;
}

const MediaPreviewTile: React.SFC<Props> = ({
  children,
  className,
  customSizing = [],
  onClick = () => null,
  index
}) => {
  function handleClick(e: React.MouseEvent) {
    onClick(e, index);
  }

  return (
    <figure
      onClick={handleClick}
      className={classnames(
        className,
        styles.container,
        ...customSizing.map(sizing => styles[sizing])
      )}
    >
      <div className={styles.mediaContainer}>{children}</div>
    </figure>
  );
};

export default MediaPreviewTile;
