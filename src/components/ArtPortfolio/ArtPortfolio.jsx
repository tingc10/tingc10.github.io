import React, { Component } from 'react';
import portfolioList from 'assets/misc/list';
import classnames from 'classnames';
import ImagePreview from 'components/ImagePreview/ImagePreview';
import Image from 'components/Image/Image';
import styles from './styles.module.scss';
import PageHeader from '../PageHeader/PageHeader';

class ArtPortfolio extends Component {
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
        <>
          {this.renderPieces()}
        </>
      );
    }
    return this.renderEnlargedImage();
  }

  render() {
    return (
      <section className={styles.container}>
        <header>
          <PageHeader>Art</PageHeader>
        </header>
        <section className={styles.artContainer}>
          {this.renderMain()}
        </section>
      </section>
    );
  }
}

export default ArtPortfolio;
