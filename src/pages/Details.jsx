import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetails';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { movie, trailerKey, loading, error } = useMovieDetails(id);
  const releaseYear = movie?.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium animate-pulse">
        Loading movie details...
      </div>
    ); 
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center  gap-4">
        <p className="text-red-400 font-medium">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/80 hover:bg-cyan-700 transition-colors text-sm font-medium cursor-pointer"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/80 hover:bg-cyan-700 transition-colors text-sm font-medium cursor-pointer"
        >
          ← Back
        </button>

        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-cyan-50">
          {trailerKey ? (
            <iframe
              className="w-full h-full border-0"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
            />
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 text-sm font-medium">
            <span>{releaseYear}</span>
            <span className="inline-flex items-center gap-1 bg-yellow-400/10 text-yellow-500 px-2.5 py-1 rounded-md border border-yellow-400/20">
              ★ {rating}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/10 text-cyan-600 border border-cyan-500/20"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 border-t border-cyan-800/80 pt-6">
          <h2 className="text-xl font-semibold ">Overview</h2>
          <p className=" leading-relaxed text-base md:text-lg max-w-3xl">
            {movie.overview || 'No overview available.'}
          </p>
        </div>
      </div>
    </div>
  );
}