import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/movieApi';

export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  return { movie, loading };
};