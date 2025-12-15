import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hàm tải dữ liệu
  useEffect(() => {
    const loadFavourites = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await movieService.getFavourites(); 
        const movies = response.data || response.results || [];
        setFavourites(movies);
      } catch (err) {
        console.error('Load favourites error:', err);
        setError('Lỗi tải danh sách yêu thích. Vui lòng thử lại sau.');
        setFavourites([]);
      } finally {
        setLoading(false);
      }
    };
    loadFavourites();
  }, []);

  // Hàm xóa phim
  const handleRemove = async (movieId) => {
    // Cập nhật giao diện ngay lập tức (Optimistic UI) để user cảm thấy nhanh hơn
    const previousFavourites = [...favourites];
    setFavourites(favourites.filter((m) => m.id !== movieId));

    try {
      await movieService.removeFavourite(movieId);
    } catch (err) {
      console.error('Remove favourite error:', err);
      setError('Lỗi xóa phim yêu thích');
      // Nếu lỗi thì hoàn tác lại danh sách cũ
      setFavourites(previousFavourites);
    }
  };

  // --- PHẦN RENDER GIAO DIỆN ---

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-2">
        Danh sách phim yêu thích
      </h1>

      {/* 1. Trạng thái Đang tải */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* 2. Trạng thái Lỗi */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Lỗi! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* 3. Trạng thái Danh sách trống (chỉ hiện khi KHÔNG load và KHÔNG lỗi) */}
      {!loading && !error && favourites.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
            Bạn chưa thêm phim nào vào danh sách yêu thích.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Khám phá phim ngay
          </Link>
        </div>
      )}

      {/* 4. Trạng thái Có dữ liệu */}
      {!loading && favourites.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Ảnh Poster (có link chi tiết) */}
              <Link to={`/movie/${movie.id}`} className="relative group">
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
                  alt={movie.title} 
                  className="w-full h-64 object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
              </Link>
              
              <div className="p-4 flex flex-col flex-grow">
                <Link to={`/movie/${movie.id}`}>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white hover:text-blue-500 line-clamp-1" title={movie.title}>
                    {movie.title}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </p>
                
                {/* Nút xóa đẩy xuống đáy */}
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-auto w-full px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  Xóa khỏi list
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}