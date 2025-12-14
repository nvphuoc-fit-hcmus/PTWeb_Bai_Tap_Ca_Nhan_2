import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFavourites = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await movieService.getFavourites(1);
        const movies = response.data || response.results || [];
        setFavourites(movies);
      } catch (err) {
        console.error('Load favourites error:', err);
        setError('Lỗi tải danh sách yêu thích');
        setFavourites([]);
      } finally {
        setLoading(false);
      }
    };
    loadFavourites();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await movieService.removeFavourite(movieId);
      setFavourites(favourites.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error('Remove favourite error:', err);
      setError('Lỗi xóa phim yêu thích');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Danh sách phim yêu thích</h1>
      {loading && (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">Đang tải...</div>
      )}
      {error && (
        <div className="text-center py-12 text-red-500">{error}</div>
      )}
      {!loading && favourites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Bạn chưa thêm phim yêu thích nào.</p>
          <Link to="/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favourites.map((movie) => (
            <div key={movie.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg">
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white">{movie.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{movie.year}</p>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-3 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFavourites = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await movieService.getFavourites(1);
        const movies = response.data || response.results || [];
        setFavourites(movies);
      } catch (err) {
        console.error('Load favourites error:', err);
        setError('Lỗi tải danh sách yêu thích');
        setFavourites([]);
      } finally {
        setLoading(false);
      }
    };
    loadFavourites();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await movieService.removeFavourite(movieId);
      setFavourites(favourites.filter(m => m.id !== movieId));
    } catch (err) {
      console.error('Remove favourite error:', err);
      setError('Lỗi xóa phim yêu thích');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Danh sách phim yêu thích</h1>
      {loading && (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">Đang tải...</div>
      )}
      {error && (
        <div className="text-center py-12 text-red-500">{error}</div>
      )}
      {favourites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Bạn chưa thêm phim yêu thích nào.</p>
          <Link to="/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favourites.map((movie) => (
            <div key={movie.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg">
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white">{movie.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{movie.year}</p>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-3 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
