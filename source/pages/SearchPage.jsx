import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import movieService from '../services/movieService';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const query = params.get('q') || ''; // Lấy keyword từ URL

  // --- HÀM LẤY ẢNH (Dùng chung logic với HomePage) ---
  const getPosterUrl = (movie) => {
    if (movie.image) {
      if (movie.image.startsWith('http')) return movie.image;
      return `https://image.tmdb.org/t/p/w500${movie.image}`;
    }
    if (movie.poster) return movie.poster;
    return 'https://via.placeholder.com/500x750?text=No+Image';
  };

  useEffect(() => {
    const search = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      setError('');
      try {
        // movieService đã sửa ở bước trước để nhận tham số 'query' map vào 'q'
        const response = await movieService.searchMovies(query, 1);
        // API Search trả về { data: [...] }
        setResults(response.data || []);
      } catch (err) {
        console.error('Search error:', err);
        setError('Lỗi khi tìm kiếm phim. Vui lòng thử lại.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen max-w-[1200px]">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4">
        Kết quả tìm kiếm
      </h1>

      {/* Trạng thái chưa nhập */}
      {!query && (
        <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Nhập tên phim, diễn viên để bắt đầu tìm kiếm.</p>
        </div>
      )}

      {/* Trạng thái Loading */}
      {loading && (
        <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Đang tìm kiếm...</p>
        </div>
      )}

      {/* Trạng thái Lỗi */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
        </div>
      )}

      {/* Trạng thái Không có kết quả */}
      {query && !loading && results.length === 0 && !error && (
        <div className="text-center py-12 text-gray-500">
            <p className="text-xl">Không tìm thấy kết quả nào cho "<strong>{query}</strong>"</p>
        </div>
      )}

      {/* Hiển thị danh sách kết quả */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative overflow-hidden aspect-[2/3]">
                {/* Ảnh Poster */}
                <img
                    src={getPosterUrl(movie)}
                    alt={movie.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'}}
                />
                {/* Điểm Rating */}
                {(movie.rate || movie.rate === 0) && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">
                        ★ {movie.rate}
                    </div>
                )}
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {movie.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {movie.year || 'N/A'}
              </p>
              <div className="mt-auto pt-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Movie
                  </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}