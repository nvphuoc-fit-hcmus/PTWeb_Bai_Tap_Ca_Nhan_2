import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- HÀM LẤY ẢNH (đồng bộ với HomePage và robust hơn) ---
  const getPosterUrl = (movie) => {
    if (!movie) return 'https://via.placeholder.com/500x750?text=No+Image';
    const candidate = [
      movie.image,
      movie.poster,
      movie.poster_path,
      movie.backdrop,
      movie.backdrop_path,
      movie.thumbnail,
      movie.posterURL,
      movie.posterUrl,
      movie.imageUrl,
      movie.fullImage,
    ].find((v) => typeof v === 'string' && v.trim() && v.trim() !== 'string');

    if (candidate) {
      if (candidate.startsWith('http')) return candidate;
      const cleanPath = candidate.startsWith('/') ? candidate : `/${candidate}`;
      return `https://image.tmdb.org/t/p/w500${cleanPath}`;
    }
    return 'https://via.placeholder.com/500x750?text=No+Image';
  };

  // API trả về IMDB ID trong trường 'id'
  const getId = (m) => m?.id;

  useEffect(() => {
    const loadFavourites = async () => {
      setLoading(true);
      try {
        const response = await movieService.getFavourites();
        // Chuẩn hóa mảng kết quả: có thể là { data: [...] } hoặc trực tiếp [] hoặc { items: [...] }
        const raw = Array.isArray(response)
          ? response
          : (response?.data || response?.items || response?.results || []);
        // Nhiều API favourites trả về { movie: {...}, createdAt, ... }
        const movies = raw.map((item) => (item?.movie ? item.movie : item));
        setFavourites(movies);
      } catch (err) {
        console.error('Lỗi tải favorites:', err);
        setError('Không thể tải danh sách yêu thích.');
      } finally {
        setLoading(false);
      }
    };
    loadFavourites();
  }, []);

  const handleRemove = async (movieId) => {
    // Optimistic UI update
    const prevList = [...favourites];
    setFavourites(favourites.filter((m) => getId(m) !== movieId));

    try {
      await movieService.removeFavourite(movieId);
    } catch (err) {
      console.error('Lỗi xóa:', err);
      alert('Xóa thất bại, vui lòng thử lại.');
      setFavourites(prevList); // Hoàn tác nếu lỗi
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen max-w-[1200px]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-3">
        <span className="text-red-500">♥</span> Danh sách yêu thích
        <span className="text-sm font-normal text-gray-500 mt-1 ml-2">({favourites.length} phim)</span>
      </h1>

      {loading && <div className="text-center py-20">Đang tải...</div>}
      
      {error && <div className="p-4 bg-red-100 text-red-700 rounded mb-6">{error}</div>}

      {!loading && !error && favourites.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 mb-4">Danh sách trống.</p>
          <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Khám phá phim ngay</Link>
        </div>
      )}

      <div className="flex flex-wrap gap-6">
        {favourites.map((movie) => {
          const id = getId(movie);
          return (
          <div key={id} className="group relative bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-row w-full hover:shadow-xl transition-shadow">
            <Link to={`/movie/${id}`} className="relative w-32 h-48 flex-shrink-0 overflow-hidden">
              <img 
                src={getPosterUrl(movie)} 
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'}}
              />
              {/* Rating badge */}
              {(movie.rate || movie.vote_average) && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">
                      ★ {movie.rate || movie.vote_average}
                  </div>
              )}
            </Link>
            
            <div className="p-4 flex flex-col flex-grow justify-between">
              <Link to={`/movie/${id}`}>
                  <h3 className="font-bold text-gray-800 dark:text-white line-clamp-1 hover:text-blue-600 transition">
                      {movie.title}
                  </h3>
              </Link>
              <p className="text-xs text-gray-500 mb-3">
                  {movie.year || 'N/A'}
              </p>
              
              <button
                onClick={() => handleRemove(id)}
                className="mt-auto w-full py-1.5 px-3 bg-red-100 text-red-600 text-xs font-bold rounded hover:bg-red-200 transition flex items-center justify-center gap-1"
              >
                Xóa
              </button>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
}