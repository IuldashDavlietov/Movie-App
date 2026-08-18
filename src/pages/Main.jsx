import { useMovie } from '../hooks/useMovie';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';

export default function Main() {
    const { movies, loading } = useMovie();

    return (
        <main className="container mx-auto px-4 py-8">
            <SearchBar />
            {loading ? (
                <div className="text-center text-cyan-400 py-12 font-medium">
                    Loading movies...
                </div>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 py-12">
                    No movie found... 
                </div>
            )}
        </main>
    );
}