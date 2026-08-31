import axios from "axios";

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const getPopularMovies = async () => {
  const response = await movieApi.get("/movie/popular");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await movieApi.get("search/movie", { params: { query } });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await movieApi.get(`/movie/${id}`);
  return response.data;
};

export const getMovieVideos = async (id) => {
  const response = await movieApi.get(`/movie/${id}/videos`);
  return response.data.results;
};
