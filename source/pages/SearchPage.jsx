import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import movieService from '../services/movieService';
import Pagination from '../components/Pagination';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('all'); // all, title, person, genre
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const query = params.get('q') || ''; // Lấy keyword từ URL

  // --- HÀM LẤY ẢNH  ---
  const getPosterUrl = (movie) => {
    if (movie.image) {
      if (movie.image.startsWith('http')) return movie.image;
      return `https://image.tmdb.org/t/p/w500${movie.image}`;
    }
    if (movie.poster) return movie.poster;
    return 'https://via.placeholder.com/500x750?text=No+Image';
  };

  // --- HÀM FORMAT THỜI LƯỢNG ---
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  // --- HÀM LẤY RATED ---
  const getRated = (movie) => {
    return movie.rated || movie.rating || movie.certification || 'N/A';
  };

  // --- HÀM LẤY GENRE ---
  const getGenres = (movie) => {
    if (Array.isArray(movie.genres)) {
      return movie.genres.slice(0, 2).join(', ');
    }
    if (typeof movie.genre === 'string') {
      return movie.genre.split(',').slice(0, 2).join(', ');
    }
    return 'N/A';
  };

  // Reset page khi query hoặc searchType thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [query, searchType]);

  useEffect(() => {
    const search = async () => {
      if (!query) {
        setResults([]);
        setTotalPages(1);
        return;
      }
      
      setLoading(true);
      setError('');
      try {
        // Build filters based on search type
        const filters = {};
        if (searchType === 'title') filters.title = query;
        else if (searchType === 'person') filters.person = query;
        else if (searchType === 'genre') filters.genre = query;
        
        const response = await movieService.searchMovies(query, currentPage, filters);
        const data = response.data || response.results || [];
        setResults(data);
        
        // Sử dụng totalPages từ API hoặc tính từ total
        let total = response.totalPages || response.total_pages;
        if (!total && response.total) {
          total = Math.ceil(response.total / 4);
        }
        // Fallback: nếu data đầy (4 items) thì giả sử có trang tiếp theo
        if (!total && data.length === 4) {
          total = currentPage + 1;
        }
        setTotalPages(total || 1);
      } catch (err) {
        console.error('Search error:', err);
        setError('Lỗi khi tìm kiếm phim. Vui lòng thử lại.');
        setResults([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query, searchType, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen max-w-[1200px]">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4">
        Kết quả tìm kiếm
      </h1>

      {/* Filter Buttons */}
      {query && (
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setSearchType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSearchType('title')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'title'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Tên phim
          </button>
          <button
            onClick={() => setSearchType('person')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'person'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Diễn viên/Đạo diễn
          </button>
          <button
            onClick={() => setSearchType('genre')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'genre'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Thể loại
          </button>
        </div>
      )}

      {/* Trạng thái chưa nhập */}
      {!query && (
        <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Nhập tên phim, diễn viên, đạo diễn hoặc thể loại để bắt đầu tìm kiếm.</p>
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
      <div>
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
              <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                  {movie.title}
              </h3>
              
              {/* Thông tin chi tiết */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {/* Năm */}
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{movie.year || 'N/A'}</span>
                </div>

                {/* Thời lượng */}
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatRuntime(movie.runtime || movie.length || movie.duration)}</span>
                </div>

                {/* Rated */}
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">{getRated(movie)}</span>
                </div>

                {/* Thể loại */}
                {getGenres(movie) !== 'N/A' && (
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="line-clamp-1">{getGenres(movie)}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
        </div>
        
        {/* Pagination */}
        {!loading && results.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}