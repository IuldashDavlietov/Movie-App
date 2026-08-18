import { useState } from "react";
import { MovieContext } from './MovieContext';
import { getPopularMovies } from "../services/movieApi";
import { searchMovies } from "../services/movieApi";
import { useEffect } from "react";


export const MovieProvider = ({ children }) => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPopularFilms = async () => {
    try {
      const PopularFilms = await getPopularMovies()
      setMovies(PopularFilms)
    }
    catch (error) {
      console.error(error, 'Something wrong')
    }
    finally {
      setLoading(false)
    }
  };

  const handleSearch = async (query) => {
    setLoading(true)
    try {
      if (query.trim()) {
        const foundFilm = await searchMovies(query)
        setMovies(foundFilm)
      } else {
        await fetchPopularFilms()
      }
    }
    catch (error) {
      console.error(error, 'Something wrong')
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
  fetchPopularFilms()
  }, [])

  return <MovieContext.Provider value={{fetchPopularFilms, handleSearch, loading, movies}}>{children}</MovieContext.Provider>
}