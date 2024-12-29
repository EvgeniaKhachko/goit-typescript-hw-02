
import React from "react";
import s from "./ImageCard.module.css";

interface ImageCardProps {
  onClick: () => void;
  description: string | null;
  likes: number;
  urls?: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  imageSrc: string;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ onClick, description, likes, imageSrc }) => {
  return (
    <div className={s.imageCard} onClick={onClick}>
      <img
        className={s.regularImage}
        src={`${imageSrc}&h=260&crop=entropy`}
        height={260}
        alt={description || "Image"}
      />
      <span>
        Likes: <span>{likes}</span>
      </span>
    </div>
  );
};

export default ImageCard;

