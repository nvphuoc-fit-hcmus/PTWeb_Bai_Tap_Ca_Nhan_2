import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import movieService from '../services/movieService';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const query = params.get('q') || '';

  useEffect(() => {
    const search = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      setError('');
      try {
        const response = await movieService.searchMovies(query, 1);
        setResults(response.data || response.results || []);
      } catch (err) {
        console.error('Search error:', err);
        setError('Lỗi tìm kiếm phim');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Kết quả tìm kiếm</h1>
      {!query && (
        <p className="text-gray-600 dark:text-gray-400">Nhập từ khóa ở thanh search để tìm phim.</p>
      )}
      {loading && (
        <p className="text-gray-600 dark:text-gray-400">Đang tìm kiếm...</p>
      )}
      {error && (
        <p className="text-red-500">{error}</p>
      )}
      {query && !loading && results.length === 0 && !error && (
        <p className="text-gray-600 dark:text-gray-400">Không có kết quả cho "{query}"</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h3 className="font-semibold text-gray-800 dark:text-white">{movie.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{movie.year || movie.release_date}</p>
            {movie.rating && (
              <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {movie.rating}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
