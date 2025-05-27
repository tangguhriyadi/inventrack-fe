"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface Props extends ImageProps {
  fallbackSrc: string;
}

const ImageFallback: React.FC<Props> = (props) => {
  const { src, fallbackSrc, alt = "img", ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const image = event.currentTarget;
    if (image.naturalWidth === 0) {
      // Broken image (not actually likely with onLoad, but here for extra safety)
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imgSrc}
      onLoad={handleLoad}
      onError={handleError}
      alt={alt}
      {...rest}
    />
  );
};

export default ImageFallback;
