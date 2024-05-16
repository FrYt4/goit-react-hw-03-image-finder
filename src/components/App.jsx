import axios from "axios";
import { SearchBar } from "./Searchbar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { useState } from "react";






export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState(true);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');


//Pixabay API
      const fetchGallery = async (q, page) => {
      const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42538770-38c8e4bc557ccec23452e1973&image_type=photo&orientation=horizontal&per_page=12`
      try {
        const response = await axios.get(baseURL);
        return response.data
      } catch (error) {
        console.error('Fetching error:', error)
      }
  }
//Handle and Fetch value from Searchbar
const fetchSearchedValue = async (data) => {
  setIsLoading(true);
  setSearchedImages(data);
  setCurrentPage(1);
  setTotalHits(0);

  await fetchGallery(data, currentPage)
    .then((results) => {
      if (currentPage === 1) {
        setImages(results.hits);
        setTotalHits(results.totalHits);
        checkIfLoadMore(results.totalHits)
        
      }
    });
  setTimeout(() => {setIsLoading(false)},1000)
  }
  
  
  const checkIfLoadMore = (data) => {
    if (data > 12) {
      setDisabledButtons(false);
      setCurrentPage(currentPage => currentPage + 1);
      setTotalHits(totalHits => totalHits - 12);
    } else {
      setDisabledButtons(true)
    };

  };

  //load more images
  const loadMore = async() => {
    setIsLoading(true);
    await fetchGallery(searchedImages, currentPage)
      .then(data => setImages(data.hits));
    checkIfLoadMore(totalHits);
    setTimeout(() => { setIsLoading(false) }, 1000);
  }

  //Modal- handle data from image and change the state to open/close modal
    const handleImageClick = image => {
      setOpenModal(true);
      setModalSrc(image.largeImageURL) //sprawdzić czy działa, jak nie to jak pobrać large url żeby wstawić jako source 
  };

  const closeModal = () => {
    setOpenModal(false);
  };

 
  return (
    <div >
      <SearchBar onSubmit={fetchSearchedValue}/>
      <ImageGallery>
        {isLoading ? <Loader /> : <ImageGalleryItem images={images} onClick={handleImageClick } /> }
      </ImageGallery>
      {totalHits !== 0 && <Button disabled={disabledButtons} onClick={loadMore} />}
      {openModal && <Modal onClick={closeModal} openModal={modalSrc } />}

    </div>
  );
};