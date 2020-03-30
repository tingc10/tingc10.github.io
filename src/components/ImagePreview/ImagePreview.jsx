import React, { Component } from "react";
import PropTypes from "prop-types";
import MediaPreviewTile from "../MediaPreviewTile/MediaPreviewTile";
import Image from "components/Image/Image";
import styles from "./styles.module.scss";

class ImagePreview extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    index: PropTypes.number,
    customSizing: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func
  };

  static defaultProps = {
    customSizing: []
  };

  setContainerRef = node => {
    this.containerRef = node;
  };

  render() {
    const { imageUrl, title, customSizing, className, index } = this.props;
    const props = {
      className: styles.image,
      src: imageUrl,
      title: title,
      objectFit: "cover"
    };

    return (
      <MediaPreviewTile
        onClick={this.props.onClick}
        index={index}
        customSizing={customSizing}
        className={className}
      >
        <Image {...props} />
      </MediaPreviewTile>
    );
  }
}

export default ImagePreview;
