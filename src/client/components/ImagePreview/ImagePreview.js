import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import objectFitImages from 'object-fit-images';
import Image from 'Image/Image'


class ImagePreview extends Component {
  onClick() {
    if (!this.props.onSelectImage) return
    this.props.onSelectImage(this.props.index)
  }
  render() {
    const { imageUrl, title } = this.props
    const props = {
      className: styles.image,
      src: imageUrl,
      title: title,
      onClick: this.onClick.bind(this)
    }
    return (
      <Image {...props} />
    );
  }
}

ImagePreview.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  index: PropTypes.number,
  onSelectImage: PropTypes.func,
}

export default ImagePreview;
