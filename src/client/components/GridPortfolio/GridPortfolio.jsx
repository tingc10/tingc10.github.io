import React, { Component } from 'react';
import portfolioList from 'assets/misc/list';
import FilmStrip from 'FilmStrip/FilmStrip';
import classnames from 'classnames';
// import ExamineImage from 'ExamineImage/ExamineImage';
import ImagePreview from 'ImagePreview/ImagePreview';
import Image from 'Image/Image';
import styles from './styles';

class GridPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: -1,
      zoomed: false,
    };
    [
      'handleSelectImage',
      'unselectImage',
      'handleEnlargeClick',
    ].forEach((methodName) => { this[methodName] = this[methodName].bind(this) });
  }
  
  componentDidMount() {
    document.addEventListener('click', this.unselectImage);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.unselectImage);
  }

  handleSelectImage(e, index) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      selectedImage: index,
    })
  }

  handleEnlargeClick(e) {
    e.nativeEvent.stopImmediatePropagation();
    if (e.target.tagName === 'IMG') {
      this.setState({
        zoomed: !this.state.zoomed,
      })
    }
  }

  unselectImage() {
    this.setState({
      selectedImage: -1,
      zoomed: false,
    });
  }
  
  currentImage() {
    return portfolioList[this.state.selectedImage]
  }

  renderPieces() {
    const pieces = []
    for (let i = 0; i < portfolioList.length; i++) {
      const { url, title, customSizing } = portfolioList[i]
      const imageProps = {
        imageUrl: url,
        title: title,
        index: i,
        key: i,
        customSizing,
        onSelectImage: this.handleSelectImage,
        className: classnames(styles.image, {
          // [styles.selectedImage]: this.state.selectedImage === i,
          // [styles.hideImage]: this.state.selectedImage !== -1
        }),
      }
      pieces.push(<ImagePreview {...imageProps} />)
    }
    return pieces
  }

  renderEnlargedImage() {
    const selectedImageInfo = portfolioList[this.state.selectedImage];
    const { url, title } = selectedImageInfo;
    const props = {
      className: classnames(styles.enlargedImage, {
        [styles.zoomed]: this.state.zoomed,
      }),
      src: url,
      title: title,
      onClick: this.handleClick,
      objectFit: this.state.zoomed ? 'cover' : 'contain',
    }

    return (
      <div
        className={styles.enlargedImageContainer}
        onClick={this.handleEnlargeClick}>
        <button
          className={styles.closeButton}
          onClick={this.unselectImage}>
          ✕
        </button>
        <figure className={styles.enlargedFigure}>
          <Image {...props} />
        </figure>
      </div>
    )
  }

  renderMain() {
    if (this.state.selectedImage === -1) {
      return (
        <div className={styles.container}>
          {this.renderPieces()}
        </div>
      );
    }
    return this.renderEnlargedImage();
  }

  render() {
    return (
      <section className={styles.section}>
        <header className={styles.container}>
          <h1 className={styles.header}>Studio Art days</h1>
        </header>
        {this.renderMain()}
      </section>
    );
  }
}

export default GridPortfolio;
