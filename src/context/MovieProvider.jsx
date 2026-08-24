import { useState, useEffect } from "react";
import { MovieContext } from './MovieContext';
import { getPopularMovies, searchMovies } from "../services/movieApi";

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const fetchPopularFilms = async () => {
    try {
      const PopularFilms = await getPopularMovies();
      setMovies(PopularFilms);
    } catch (error) {
      console.error(error, 'Something wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      if (query.trim()) {
        const foundFilm = await searchMovies(query);
        setMovies(foundFilm);
      } else {
        await fetchPopularFilms();
      }
    } catch (error) {
      console.error(error, 'Something wrong');
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (id) => setSelectedMovieId(id);
  const closeDetails = () => setSelectedMovieId(null);

  useEffect(() => {
    fetchPopularFilms();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        fetchPopularFilms,
        handleSearch,
        loading,
        movies,
        selectedMovieId,
        openDetails,
        closeDetails
      }} > {children}</MovieContext.Provider>
  );
};