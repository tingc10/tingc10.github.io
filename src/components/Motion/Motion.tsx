
import * as React from "react";
import { useState, useEffect } from "react";
import classnames from "classnames";
import MediaPreviewTile, { MediaSizing } from '../MediaPreviewTile/MediaPreviewTile';
import { motionSamples } from '../../assets/misc/motion-samples';
import styles from "./styles.module.scss";
import PageHeader from "../PageHeader/PageHeader";
import EnlargedMedia from "../EnlargedMedia/EnlargedMedia";
import Modal from "../Modal/Modal";

interface Props {

}

const Motion: React.SFC<Props> = () => {
  const [selectedImage, setSelectedImage] = useState(-1);

  function unselectMedia() {
    setSelectedImage(-1);
  }

  function handleSelectMedia(e: React.MouseEvent, index: number) {
    e.nativeEvent.stopImmediatePropagation();
    setSelectedImage(index);
  }

  useEffect(() => {
    document.addEventListener("click", unselectMedia);
    return () => {
      document.removeEventListener("click", unselectMedia);
    }
  }, []);

  function renderPieces() {
    const pieces = [];
    for (let i = 0; i < motionSamples.length; i++) {
      const { url, title, customSizing } = motionSamples[i];
      const mediaProps = {
        index: i,
        key: i,
        onClick: handleSelectMedia,
        className: classnames(styles.media),
        customSizing: customSizing as MediaSizing[]
      };
      pieces.push(
      <MediaPreviewTile {...mediaProps}>
        <video title={title} className={styles.video} controls={true}>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </MediaPreviewTile>);
    }
    return pieces;
  }

  function renderEnlargedImage() {
    if (selectedImage === -1) {
      return null;
    }

    const selectedImageInfo = motionSamples[selectedImage];
    const { url, title } = selectedImageInfo;

    return (
      <Modal onClickBackground={unselectMedia}>
        <EnlargedMedia
          onClickClose={unselectMedia}
        >
          <video title={title} className={styles.media} controls={true}>
            <source src={url} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </EnlargedMedia>
      </Modal>
    );
  }

  return (<div>
      <PageHeader description="Animated clips studying principles of animation. Created during Animation Bootcamp by School of Motion.">
        Motion
      </PageHeader>
      <div className={styles.artContainer}>{renderPieces()}</div>
      {renderEnlargedImage()}
    </div>
  )
}

export default Motion;
