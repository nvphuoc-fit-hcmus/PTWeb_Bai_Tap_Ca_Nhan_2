import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search as SearchIcon } from 'lucide-react';

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="py-3 px-4 mb-0.5">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between bg-blue-100 dark:bg-blue-900 shadow rounded-xl px-6 py-3">
        {/* Góc trái - Icon Home */}
        <Link
          to="/"
          className="p-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <Home className="w-6 h-6 text-black dark:text-gray-200" />
        </Link>

        {/* Góc phải - Thanh search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-64 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-200 dark:bg-blue-700 text-gray-800 dark:text-white rounded-lg border-2 border-blue-400 dark:border-blue-600 hover:bg-blue-300 font-medium flex items-center gap-2"
          >
            <SearchIcon className="w-4 h-4" />
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
