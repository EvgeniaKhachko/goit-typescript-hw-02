import { useState, useEffect } from "react";
import React from "react";
import ApiService from "./services/ApiService";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  description: string | null;
  likes?: number;
}

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
    thumb: string; 
  };
  likes: number; 
  description: string | null;
}


interface ApiResponse {
  results: UnsplashImage[];
  total: number;
}

const imageService = new ApiService();

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [galleryPage, setGalleryPage] = useState<number>(1);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!searchQuery) return;
  
    const fetchGalleryItems = (query: string, page: number) => {
      setLoading(true);
  
      imageService.query = query;
      imageService.page = page;
  
      imageService
        .fetchPost()
        .then((data: ApiResponse) => {
          const newData = data.results.map(
            ({ id, urls, likes, description }) => ({
              id,
              urls: {
                small: urls.small,
                regular: urls.regular,
                full: urls.full,
                thumb: urls.small, 
              },
              likes: likes ?? 0, 
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
        .catch((error: Error) => {
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

  const handleSubmit = (searchQuery: string) => {
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

  function openModal(image: Image) {
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
        {images.length > 0 && images.length < totalHits && (
          <LoadMoreBtn onClick={onLoadMore} />
        )}
      </div>
    </>
  );
}

export default App;