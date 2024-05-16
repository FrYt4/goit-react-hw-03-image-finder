import axios from "axios";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { useState } from 'react';
import { Searchbar } from "./Searchbar/Searchbar";

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [disabledButton, setDisabledButton] = useState(true);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  // Pixabay API
  const fetchGallery = async (q, page) => {
    const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42538770-38c8e4bc557ccec23452e1973&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  // Handle and fetch value from input
  const fetchSearchedValue = async (data) => {
    setIsLoading(true);
    setSearchedImages(data);
    setCurrentPage(1);
    setTotalHits(0);
    setImages([]);

    const results = await fetchGallery(data, 1);
    if (results) {
      setImages(results.hits);
      setTotalHits(results.totalHits);
      checkIfLoadMore(results.totalHits);
    }
    setIsLoading(false);
  };

  // Check if load more is enabled
  const checkIfLoadMore = (totalHits) => {
    if (totalHits > 12) {
      setDisabledButton(false);
      setCurrentPage((prevPage) => prevPage + 1);
      setTotalHits((prevHits) => prevHits - 12);
    } else {
      setDisabledButton(true);
    }
  };

  // Load more images
  const loadMore = async () => {
    setIsLoading(true);
    const results = await fetchGallery(searchedImages, currentPage);
    if (results) {
      setImages((prevImages) => [...prevImages, ...results.hits]);
      checkIfLoadMore(totalHits - 12);
    }
    setIsLoading(false);
  };

  // Modal - handle data from image and change the state to open/close modal
  const handleImageClick = (image) => {
    setOpenModal(true);
    setModalSrc(image.largeImageURL);
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalSrc('');
  };

  return (
    <div>
      <Searchbar onSubmit={fetchSearchedValue} />
      {isLoading && <Loader />}
      <ImageGallery>
        <ImageGalleryItem images={images} onClick={handleImageClick} />
      </ImageGallery>
      {totalHits > 0 && <Button disabled={disabledButton} onClick={loadMore} />}
      {openModal && <Modal onClick={closeModal} src={modalSrc} />}
    </div>
  );
};