import * as React from "react";
import MediaPreviewTile from "../MediaPreviewTile/MediaPreviewTile";
import Image from "@src/components/Image/Image";
import styles from "./styles.module.scss";
import { MediaSizing } from '@src/types/MediaSizing'
import { PROGRESSIVE_JPG_QUERY } from '@src/utils/contentful'
import { ObjectFitProperty } from 'csstype'

interface Props {
  imageUrl: string,
  title: string,
  index: number,
  customSizing?: MediaSizing[],
  onClick: (e: React.MouseEvent<Element, MouseEvent>, index: number) => void,
  className?: string,
}

const DEFAULT_IMAGE_WIDTH = 700;

const ImagePreview: React.FC<Props> = ({customSizing = [], imageUrl, title, index, onClick, className}) => {
  const props = {
    className: styles.image,
    // TODO: Load correct width based on size of window
    src: `${imageUrl}?${PROGRESSIVE_JPG_QUERY}&w=${DEFAULT_IMAGE_WIDTH}`,
    title: title,
    objectFit: "cover" as ObjectFitProperty
  };
  // TODO: Fade in images

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
