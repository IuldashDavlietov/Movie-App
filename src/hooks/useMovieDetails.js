import { useState, useEffect } from "react";
import { getMovieDetails, getMovieVideos } from "../services/movieApi";

export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetailsAndVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const [detailsData, videosData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieVideos(movieId),
        ]);

        setMovie(detailsData);

        const trailer = videosData?.find(
          (video) => video.site === "YouTube" && video.type === "Trailer",
        );
        const fallbackVideo = videosData?.find(
          (video) => video.site === "YouTube",
        );

        setTrailerKey(trailer?.key || fallbackVideo?.key || null);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Movie not found...");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsAndVideos();
    return () => {
      setMovie(null);
      setTrailerKey(null);
    };
  }, [movieId]);

  return { movie, trailerKey, loading, error };
};
