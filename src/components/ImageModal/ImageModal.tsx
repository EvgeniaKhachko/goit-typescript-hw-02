import React from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface Image {
  id: string;
  description: string | null;
  urls: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

interface ImageModalProps {
  openModal: boolean;
  closeModal: () => void;
  image: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ openModal, closeModal, image }) => {
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName={s.ReactModal__Overlay}
      className={s.ReactModal__Content}
      contentLabel={(image?.description) || "Image modal"}
    >
      {image && (
        <div className={s.modal}>
          <img
            src={image.urls.regular}
            alt={image.description || "Image"}
            className={s.widthAbs}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;

