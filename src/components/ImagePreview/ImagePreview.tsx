import * as React from "react";
import MediaPreviewTile from "../MediaPreviewTile/MediaPreviewTile";
import Image from "@src/components/Image/Image";
import styles from "./styles.module.scss";
import { MediaSizing } from '@src/types/MediaSizing'
import { ObjectFitProperty } from 'csstype'

interface Props {
  imageUrl: string,
  title: string,
  index: number,
  customSizing?: MediaSizing[],
  onClick: (e: React.MouseEvent<Element, MouseEvent>, index: number) => void,
  className?: string,
}

const ImagePreview: React.FC<Props> = ({customSizing = [], imageUrl, title, index, onClick, className}) => {
  const props = {
    className: styles.image,
    src: imageUrl,
    title: title,
    objectFit: "cover" as ObjectFitProperty
  };

  return (
    <MediaPreviewTile
      onClick={onClick}
      index={index}
      customSizing={customSizing}
      className={className}
    >
      <Image {...props} />
    </MediaPreviewTile>
  );
}

export default ImagePreview;
