
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=No+Poster';

export const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, vote_average } = movie;

  const posterUrl = poster_path ? `${BASE_POSTER_URL}${poster_path}` : PLACEHOLDER_IMAGE;

  const releaseYear = release_date ? release_date.split('-')[0] : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return (
    <article className="bg-gray-800/60 rounded-xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 flex flex-col hover:scale-[1.02]">
      <div className="relative aspect-2/3 w-full bg-gray-900">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-yellow-400 px-2 py-1 rounded-md text-xs font-bold border border-yellow-400/20">
          ★ {rating}
        </span>
      </div>

      <div className="p-4 flex flex-col grow justify-between gap-2">
        <h3 className="text-base font-semibold text-white line-clamp-1" title={title}>
          {title}
        </h3>
        <p className="text-sm text-gray-400">{releaseYear}</p>
      </div>
    </article>
  );
};