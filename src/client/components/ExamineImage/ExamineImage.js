import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import Image from 'Image/Image'

class ExamineImage extends Component {
  render() {
    const {image} = this.props
    const imageProps = {
      className: styles.image,
      src: image.url,
      title: image.title,
    };
    return (
      <Image {...imageProps} />
    );
  }
}

ExamineImage.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }),
}

ExamineImage.defaultProps = {
}

export default ExamineImage;
