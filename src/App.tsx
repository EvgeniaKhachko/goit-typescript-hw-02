import { useState, useEffect } from "react";
import React from "react";
import ApiService from "./services/ApiService.js";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Loader from "./components/Loader/Loader.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const imageService = new ApiService();
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchGalleryItems = (query, page) => {
      setLoading(true);

      imageService.query = query;
      imageService.page = page;

      imageService
        .fetchPost()
        .then((data) => {
          console.log("data");
          console.log(data);
          const newData = data.results.map(
            ({ id, urls, likes, description }) => ({
              id,
              urls,
              likes,
              description,
            })
          );
          setImages((prevImages) => [...prevImages, ...newData]);
          setTotalHits(data.total);

          if (!data.total) {
            setError(true);

            return toast.error(
              "Sorry, there are no images matching your search query. Please try again."
            );
          }

          if (page === 1) {
            toast.success(`Hooray! We found ${data.total} images.`);
          }
        })
        .catch((error) => {
          toast.error(error.message);
          setError(true);
          setImages([]);
          setTotalHits(0);
          setGalleryPage(1);
        })
        .finally(() => setLoading(false));
    };

    fetchGalleryItems(searchQuery, galleryPage);
  }, [searchQuery, galleryPage]);

  const handleSubmit = (searchQuery) => {
    setSearchQuery("");
    setImages([]);
    setTotalHits(0);
    setGalleryPage(1);
    setError(false);

    setSearchQuery(searchQuery);
  };

  const onLoadMore = () => {
    setGalleryPage((prevPage) => prevPage + 1);
  };

  function openModal(image) {
    setSelectedImage(image);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedImage(null);
  }

  return (
    <>
      <div>
        <SearchBar onSubmit={handleSubmit} />

        <ImageGallery images={images} openModal={openModal} />
        <ImageModal
          image={selectedImage}
          closeModal={closeModal}
          openModal={modalIsOpen}
        />

        {loading && <Loader />}
        {0 < images.length && images.length < totalHits && (
          <LoadMoreBtn onClick={onLoadMore} />
        )}
      </div>
    </>
  );
}

export default App;
