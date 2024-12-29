
import React from "react";
import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

interface Image {
  id: string;
  description: string | null;
  likes: number;
  urls: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

interface ImageGalleryProps {
  images: Image[];
  openModal: (image: Image) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={s.gallery}>
      <li>
        <div className={s.imageGallery}>
          {images.map((image) => (
            <ImageCard
              className={s.imageCard}
              key={image.id}
              onClick={() => openModal(image)}
              description={image.description}
              likes={image.likes}
              urls={image.urls}
              imageSrc={image.urls.small}
            />
          ))}
        </div>
      </li>
    </ul>
  );
};

export default ImageGallery;

