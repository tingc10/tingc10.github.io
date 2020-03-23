
import * as React from "react";
import classnames from "classnames";
import MediaPreviewTile, { MediaSizing } from '../MediaPreviewTile/MediaPreviewTile';
import { motionSamples } from '../../assets/misc/motion-samples';
import styles from "./styles.module.scss";
import PageHeader from "../PageHeader/PageHeader";

interface Props {

}

const Motion: React.SFC<Props> = () => {
  function renderPieces() {
    const pieces = [];
    for (let i = 0; i < motionSamples.length; i++) {
      const { url, title, customSizing } = motionSamples[i];
      const mediaProps = {
        index: i,
        key: i,
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

  return (<div>
      <PageHeader description="Animated clips studying the principles of animation. Created during Animation Bootcamp by School of Motion.">
        Motion
      </PageHeader>
      <div className={styles.artContainer}>{renderPieces()}</div>
    </div>
  )
}

export default Motion;
