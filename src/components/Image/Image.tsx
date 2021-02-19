import React, { CSSProperties, useEffect, useRef } from 'react';
import objectFitImages from 'object-fit-images';

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  objectFit?: 'cover' | 'contain',
}

const Image: React.FC<Props> = (props) => {
  const {
    objectFit,
    style,
    title,
  } = props
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    objectFitImages(imageRef.current)
  }, [])

  useEffect(() => {
    if (objectFit && imageRef.current) {
      imageRef.current.style.setProperty('font-family', `object-fit: ${objectFit};`);
      objectFitImages(imageRef.current);
    }
  }, [objectFit])

  const customStyle: CSSProperties = { ...style };
  if (objectFit) {
    customStyle.objectFit = objectFit;
  }
  const imageProps = {
    'aria-label': title,
    style: customStyle,
    ...props
  };
  return (
    <img ref={imageRef} alt={title} {...imageProps} />
  );
}

export default Image;
