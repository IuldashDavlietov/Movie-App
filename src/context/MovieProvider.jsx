import { useState, useEffect } from "react";
import { MovieContext } from './MovieContext';
import { getPopularMovies, searchMovies } from "../services/movieApi";
import { useMemo } from "react";


function compareMovies(a, b, sortBy) {
  switch (sortBy) {
    case 'rating': return (b.vote_average || 0) - (a.vote_average || 0);
    case 'year': return (parseInt(b.realease_date) || 0) - (parseInt(a.realaese_date) || 0);
    case 'title': return (a.title || '').localeCompare(b.title || '');
    default: return 0
  }
}

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [sortBy, setSortBy] = useState('default');

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


const sortedMovies = useMemo(() => {
    if (sortBy === 'default') return movies;
    return [...movies].sort((a, b) => compareMovies(a, b, sortBy));
  }, [movies, sortBy]);

return (
  <MovieContext.Provider
    value={{
      fetchPopularFilms,
      handleSearch,
      loading,
      movies: sortedMovies,
      selectedMovieId,
      openDetails,
      closeDetails,
      compareMovies,
      sortBy,
      setSortBy
    }} > {children}</MovieContext.Provider>
);
};