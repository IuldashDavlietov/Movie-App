import { useState } from "react";
import { MovieContext } from './MovieContext';
import { getPopularMovies } from "../services/movieApi";
import { searchMovies } from "../services/movieApi";


export const MovieProvider = ({ children }) => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);



  return <MovieContext.Provider value={}>{children}</MovieContext.Provider>
}
