import React, { Component } from "react";
import portfolioList from "@assets/misc/list";
import classnames from "classnames";
import ImagePreview from "components/ImagePreview/ImagePreview";
import Image from "components/Image/Image";
import styles from "./styles.module.scss";
import PageHeader from "../PageHeader/PageHeader";
import EnlargedMedia from "../EnlargedMedia/EnlargedMedia";
import Modal from "../Modal/Modal";

class ArtPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: -1,
      zoomed: false
    };
    ["handleSelectImage", "unselectImage", "handleEnlargeClick"].forEach(
      methodName => {
        this[methodName] = this[methodName].bind(this);
      }
    );
  }

  componentDidMount() {
    document.addEventListener("click", this.unselectImage);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.unselectImage);
  }

  handleSelectImage(e, index) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      selectedImage: index
    });
  }

  handleEnlargeClick(e) {
    e.nativeEvent.stopImmediatePropagation();
    if (e.target.tagName === "IMG") {
      this.setState({
        zoomed: !this.state.zoomed
      });
    }
  }

  unselectImage() {
    this.setState({
      selectedImage: -1,
      zoomed: false
    });
  }

  currentImage() {
    return portfolioList[this.state.selectedImage];
  }

  renderPieces() {
    const pieces = [];
    for (let i = 0; i < portfolioList.length; i++) {
      const { url, title, customSizing } = portfolioList[i];
      const imageProps = {
        imageUrl: url,
        title: title,
        index: i,
        key: i,
        customSizing,
        onClick: this.handleSelectImage,
        className: classnames(styles.image)
      };
      pieces.push(<ImagePreview {...imageProps} />);
    }
    return pieces;
  }

  renderEnlargedImage() {
    if (this.state.selectedImage === -1) {
      return null;
    }

    const selectedImageInfo = portfolioList[this.state.selectedImage];
    const { url, title } = selectedImageInfo;
    const props = {
      className: classnames(styles.enlargedImage, {
        [styles.zoomed]: this.state.zoomed
      }),
      src: url,
      title: title,
      // onClick: this.handleClick,
      objectFit: this.state.zoomed ? "cover" : "contain"
    };

    return (
      <Modal>
        <EnlargedMedia
          onClickBackground={this.handleEnlargeClick}
          onClickClose={this.unselectImage}
        >
          <Image {...props} />
        </EnlargedMedia>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <PageHeader description="Drawings and paitings from when I pursued art school.">
          Art
        </PageHeader>
        <div className={styles.artContainer}>{this.renderPieces()}</div>
        {this.renderEnlargedImage()}
      </div>
    );
  }
}

export default ArtPortfolio;
