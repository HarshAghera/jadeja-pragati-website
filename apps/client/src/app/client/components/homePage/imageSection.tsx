"use client";

import React, { useState } from "react";
import Image from "next/image";

type ImageSectionProps = {
  src: string;
  alt: string;
};

const ImageSection: React.FC<ImageSectionProps> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={100}
        className={`object-cover object-center lg:object-top transition-opacity duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default ImageSection;
