"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const FALLBACK_IMAGE =
  "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-C6FPmWm59CyP.jpg";

type SafeImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  alt,
  fallbackSrc = FALLBACK_IMAGE,
  ...props
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(
    typeof src === "string" && src.trim().length > 0 ? src : fallbackSrc
  );

  useEffect(() => {
    setImageSrc(
      typeof src === "string" && src.trim().length > 0 ? src : fallbackSrc
    );
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      unoptimized
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
      }}
    />
  );
}