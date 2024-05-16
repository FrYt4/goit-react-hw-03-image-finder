import axios from "axios";
import { SearchBar } from "./Searchbar/SearchBar";

export const App = () => {


//Pixabay API
      const fetchGallery = async (q, page) => {
      const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42538770-38c8e4bc557ccec23452e1973&image_type=photo&orientation=horizontal&per_page=12`
      try {
        const response = await axios.get(baseURL);
        return response.data
      } catch (error) {
        console.error('Fetching error:', error)
      }
   }}

