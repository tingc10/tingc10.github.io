import React, { useEffect, useState } from "react";
import portfolioList from "@assets/misc/list";
import classnames from "classnames";
import ImagePreview from "@src/components/ImagePreview/ImagePreview";
import Image from "@src/components/Image/Image";
import styles from "./styles.module.scss";
import PageHeader from "../PageHeader/PageHeader";
import EnlargedMedia from "../EnlargedMedia/EnlargedMedia";
import Modal from "../Modal/Modal";
import { ObjectFitProperty } from 'csstype'

const ArtPortfolio: React.FC<{}> = () => {
  const [selectedImage, setSelectedImage] = useState<number>(-1)
  const [zoomed, setZoomed] = useState<boolean>(false)
  
  function unselectImage() {
    setSelectedImage(-1)
    setZoomed(false)
  }

  useEffect(() => {
    document.addEventListener("click", unselectImage);
    return () => {
      document.removeEventListener("click", unselectImage);
    }
  }, [])

  function handleSelectImage(event: React.MouseEvent<Element, MouseEvent>, index: number) {
    event.nativeEvent.stopImmediatePropagation();
    setSelectedImage(index)
  }

  function renderEnlargedImage() {
    if (selectedImage === -1) {
      return null;
    }

    const selectedImageInfo = portfolioList[selectedImage];
    const { url, title } = selectedImageInfo;
    const props = {
      className: classnames(styles.enlargedImage, {
        [styles.zoomed]: zoomed
      }),
      src: url,
      title: title,
      objectFit: zoomed ? "cover" : "contain" as ObjectFitProperty
    };

    function setNextImage() {
      const prevImage = selectedImage - 1;
      setSelectedImage(prevImage > 0 ? prevImage : portfolioList.length - 1)
    }
    
    function setPrevImage() {
      const nextImage = selectedImage + 1;
      setSelectedImage(nextImage < portfolioList.length ? nextImage : 0)
    }

    return (
      <Modal>
        <EnlargedMedia
          closeMedia={unselectImage}
          nextMedia={setNextImage}
          prevMedia={setPrevImage}
        >
          <Image {...props} />
        </EnlargedMedia>
      </Modal>
    );
  }

    return (
      <div>
        <PageHeader description="Drawings and paintings from when I pursued art school.">
          Art
        </PageHeader>
        <div className={styles.artContainer}>
          {
            portfolioList.map((artMeta, index) => {
              const { url, title, customSizing } = artMeta;
              const imageProps = {
                imageUrl: url,
                title: title,
                index: index,
                key: `${title}-${index}`,
                customSizing,
                onClick: handleSelectImage,
                className: classnames(styles.image)
              };
              return <ImagePreview {...imageProps} /> }) 
            }
        </div>
        {renderEnlargedImage()}
      </div>
    );
}

export default ArtPortfolio;
