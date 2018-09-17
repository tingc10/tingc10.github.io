import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ImagePreview from 'components/ImagePreview/ImagePreview'
import styles from './styles.sass'

class FilmStrip extends Component {
  renderPieces() {
    const pieces = []
    for (let i = 0; i < this.props.imageList.length; i++) {
      const { url, title } = this.props.imageList[i]
      const imageProps = {
        imageUrl: url,
        title: title,
        index: i,
        // key: i,
        onSelectImage: this.props.onSelectImage
      }
      pieces.push(<ImagePreview {...imageProps} />)
    }
    return pieces
  }
  render() {
    return (
      <div className={styles.container} >
        { this.renderPieces() }
      </div>
    );
  }
}

FilmStrip.propTypes = {
  imageList: PropTypes.array.isRequired,
  selectedImageIndex: PropTypes.number,
  onSelectImage: PropTypes.func,
}

FilmStrip.defaultProps = {
  selectedImageIndex: 0,
}

export default FilmStrip;
