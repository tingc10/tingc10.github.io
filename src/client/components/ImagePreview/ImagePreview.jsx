import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objectFitImages from 'object-fit-images';
import classnames from 'classnames';

import Image from 'Image/Image'
import styles from './styles';

class ImagePreview extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    index: PropTypes.number,
    onSelectImage: PropTypes.func,
    customSizing: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    customSizing: [],
  }

  constructor() {
    super();
    ['handleClick'].forEach((methodName) => { this[methodName] = this[methodName].bind(this) });
  }

  handleClick(e) {
    if (!this.props.onSelectImage) return
    this.props.onSelectImage(e, this.props.index)
  }

  setContainerRef = (node) => {
    this.containerRef = node;
  }

  render() {
    const { imageUrl, title, customSizing, className } = this.props
    const props = {
      className: styles.image,
      src: imageUrl,
      title: title,
      onClick: this.handleClick,
      objectFit: 'cover',
    }

    return (
      <figure className={classnames(className, styles.container, ...customSizing.map((sizing) => styles[sizing]))} ref={this.setContainerRef}>
        <div className={styles.imageContainer}>
          <Image {...props} />
        </div>
      </figure>
    );
  }
}

export default ImagePreview;
