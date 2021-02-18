import React, { useEffect, useState } from "react";
import classnames from "classnames";
import ImagePreview from "@src/components/ImagePreview/ImagePreview";
import Image from "@src/components/Image/Image";
import styles from "./styles.module.scss";
import PageHeader from "../PageHeader/PageHeader";
import EnlargedMedia from "../EnlargedMedia/EnlargedMedia";
import Modal from "../Modal/Modal";
import { ObjectFitProperty } from 'csstype'
import { contentfulClient, PROGRESSIVE_JPG_QUERY } from "@src/utils/contentful";
import { MediaSizing } from "@src/types/MediaSizing";
import { Entry, Asset } from "contentful";

interface ArtPiece {
  title: string;
  image: Asset;
  slug?: string;
  customSizing?: MediaSizing[]
}

const DEFAULT_ENLARGED_IMAGE_WIDTH = 1000;

const ArtPortfolio: React.FC<{}> = () => {
  const [selectedImage, setSelectedImage] = useState<number>(-1)
  const [zoomed, setZoomed] = useState<boolean>(false)
  const [artPieces, setArtPieces] = useState<Entry<ArtPiece>[] | null>(null)
  
  function unselectImage() {
    setSelectedImage(-1)
    setZoomed(false)
  }

  useEffect(() => {
    async function getArtPieces() {
      const results = await contentfulClient.getEntries<ArtPiece>({
        content_type: 'artPiece'
      })
      setArtPieces(results.items)
    }
    getArtPieces()
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
    if (selectedImage === -1 || artPieces == null) {
      return null;
    }

    const selectedImageInfo = artPieces[selectedImage].fields;
    const { image: {fields: {file: {
      url
    }}}, title } = selectedImageInfo;
    const props = {
      className: classnames(styles.enlargedImage, {
        [styles.zoomed]: zoomed
      }),
      // TODO: Optimize for phone screen
      src: `${url}?${PROGRESSIVE_JPG_QUERY}&w=${DEFAULT_ENLARGED_IMAGE_WIDTH}`,
      title: title,
      objectFit: zoomed ? "cover" : "contain" as ObjectFitProperty
    };

    function setNextImage() {
      const prevImage = selectedImage - 1;
      setSelectedImage(prevImage > 0 ? prevImage : (artPieces?.length ?? 0) - 1)
    }
    
    function setPrevImage() {
      const nextImage = selectedImage + 1;
      setSelectedImage(nextImage < (artPieces?.length ?? 0) ? nextImage : 0)
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
            artPieces?.map(({ fields }, index) => {
              const { image: {fields: {file: {
                url
              }}}, title, customSizing } = fields;
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
