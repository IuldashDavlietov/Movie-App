import { useState } from 'react';
import { useMovie } from '../hooks/useMovie';
import Input from './Input';

export const SearchBar = () => {
    const [query, setQuery] = useState('');
    const { handleSearch } = useMovie();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto my-6">
            <Input
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
            <button
                type="submit"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors" >
                Search
            </button>
        </form>
    );
};