import { useMovie } from '../hooks/useMovie';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import SortBar from '../components/SortBar';

export default function Main() {
    const { movies, loading, sortBy, setSortBy } = useMovie();

    return (
        <main className="container mx-auto px-4 py-8 relative">
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <SearchBar />
                <SortBar sortBy = {sortBy} onSortChange= {setSortBy} />
            </div>
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