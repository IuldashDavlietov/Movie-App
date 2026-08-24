import { useState } from 'react';
import { useMovieDetails } from '../hooks/useMovieDetails';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=No+Poster';

export const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { movie: details, loading } = useMovieDetails(isHovered ? movie.id : null);

  const { title, poster_path, release_date, vote_average } = movie;
  const posterUrl = poster_path ? `${BASE_POSTER_URL}${poster_path}` : PLACEHOLDER_IMAGE;
  const releaseYear = release_date ? release_date.split('-')[0] : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return (
    <article 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-gray-800/60 rounded-xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 flex flex-col group"
    >
      <div className="relative aspect-2/3 w-full bg-gray-900 overflow-hidden rounded-xl">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        <span className="absolute top-3 right-3 bg-black/70 text-yellow-400 px-2 py-1 rounded-md text-xs font-bold border border-yellow-400/20 z-10 transition-opacity duration-300 group-hover:opacity-0">
          ★ {rating}
        </span>

        <div 
          className={`absolute inset-0 p-5 flex flex-col justify-start z-20 
            bg-black/40 rounded-xl
            transition-transform duration-300 ease-in-out ${
              isHovered ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <h4 className="text-base font-bold text-white mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">{title}</h4>
          <p className="text-xs text-gray-200 mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">{releaseYear}</p>
          
          {loading ? (
            <div className="text-xs text-cyan-400 animate-pulse font-medium">Download...</div>
          ) : (
            <p className="text-xs text-gray-100 line-clamp-10 leading-relaxed overflow-y-auto pr-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              {details?.overview || 'No description available'}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col grow justify-between gap-2 z-10 bg-gray-800/60">
        <h3 className="text-base font-semibold text-white line-clamp-1" title={title}>
          {title}
        </h3>
        <p className="text-sm text-gray-400">{releaseYear}</p>
      </div>
    </article>
  );
};