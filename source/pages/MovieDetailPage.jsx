import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import movieService from '../services/movieService';

export default function MovieDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewSort, setReviewSort] = useState('newest');
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  // --- HÀM LẤY ẢNH (Chuẩn hóa) ---
  const getPosterUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    if (path.startsWith('http')) return path;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      setError('');
      try {
        console.log(`[MovieDetail] Loading movie with ID: "${id}"`);
        const response = await movieService.getMovieDetail(id);
        console.log(`[MovieDetail] Response received:`, response);
        
        // Xử lý các cấu trúc response khác nhau
        let movieData = null;
        if (response?.data) {
          movieData = response.data;
        } else if (response) {
          movieData = response;
        }
        
        console.log(`[MovieDetail] Processed movie data:`, movieData);
        
        if (movieData && (movieData.title || movieData.name)) {
          setMovie(movieData);
        } else {
          console.error('[MovieDetail] Invalid movie data - missing title:', response);
          setError('Không tìm thấy thông tin phim');
        }
      } catch (err) {
        console.error('[MovieDetail] Load error:', err);
        // Hiển thị thông báo lỗi chi tiết hơn
        const errorMessage = err?.message || err?.error || 'Lỗi tải thông tin phim. Vui lòng thử lại sau.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadMovie();
    }
  }, [id]);

  // Kiểm tra xem movie có trong danh sách yêu thích không
  useEffect(() => {
    const checkFavouriteStatus = async () => {
      if (!isAuthenticated || !id) return;
      
      try {
        const response = await movieService.getFavourites();
        const favourites = Array.isArray(response)
          ? response
          : (response?.data || response?.items || response?.results || []);
        
        // Xử lý trường hợp API trả về { movie: {...} }
        const movies = favourites.map((item) => (item?.movie ? item.movie : item));
        
        // Kiểm tra xem movie có trong danh sách yêu thích không
        const isFav = movies.some((fav) => {
          const favId = fav?.id;
          return favId && favId.toString() === id.toString();
        });
        
        setIsFavourite(isFav);
      } catch (err) {
        console.error('Error checking favourite status:', err);
        // Không hiển thị alert, chỉ log lỗi
      }
    };
    
    checkFavouriteStatus();
  }, [id, isAuthenticated]);

  // Load reviews riêng
  useEffect(() => {
    const loadReviews = async () => {
      if (!id) return;
      
      setReviewsLoading(true);
      try {
        const response = await movieService.getMovieReviews(id, 1, 10, reviewSort);
        const reviewsData = Array.isArray(response) 
          ? response 
          : (response?.data || response?.results || response?.reviews || []);
        setReviews(reviewsData);
      } catch (err) {
        console.error('Error loading reviews:', err);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };
    
    loadReviews();
  }, [id, reviewSort]);

  const handleFavourite = async () => {
    try {
      if (isFavourite) {
        await movieService.removeFavourite(id);
      } else {
        await movieService.addFavourite(id);
      }
      setIsFavourite(!isFavourite);
    } catch (err) {
      console.error('Favourite error:', err);
      alert('Chức năng yêu thích cần đăng nhập hoặc API đang lỗi');
    }
  };

  const toggleReviewExpand = (reviewId) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    const normalizedRating = rating ? Math.min(Math.max(rating / 2, 0), maxStars) : 0;
    
    for (let i = 1; i <= maxStars; i++) {
      if (i <= Math.floor(normalizedRating)) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === Math.ceil(normalizedRating) && normalizedRating % 1 !== 0) {
        stars.push(<span key={i} className="text-yellow-400">☆</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">☆</span>);
      }
    }
    return stars;
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Không tìm thấy phim</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      {/* --- PHẦN INFO PHIM --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Poster */}
        <div>
          <img 
            src={getPosterUrl(movie.image || movie.poster)} 
            alt={movie.title} 
            className="w-full rounded-lg shadow-2xl" 
            onError={(e) => {e.target.src = 'https://via.placeholder.com/500x750?text=Error'}}
          />
          {isAuthenticated && (
            <button
              onClick={handleFavourite}
              className={`w-full mt-4 px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors ${
                isFavourite 
                  ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <Heart className="w-5 h-5" fill={isFavourite ? 'currentColor' : 'none'} />
              {isFavourite ? 'Đã thích' : 'Thêm vào yêu thích'}
            </button>
          )}
        </div>

        {/* Thông tin chi tiết */}
        <div className="md:col-span-2 text-gray-800 dark:text-gray-200">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-xl text-gray-500 mb-6">{movie.original_title || movie.full_title}</p>

          <div className="space-y-4 mb-8">
            <p><strong>Năm phát hành:</strong> {movie.year}</p>
            <p><strong>Thời lượng:</strong> {movie.runtime || movie.length || 'N/A'}</p>
            <p>
                <strong>Đánh giá: </strong> 
                <span className="bg-yellow-400 text-black px-2 py-1 rounded font-bold text-sm">
                    ★ {movie.rate || 0}
                </span>
            </p>
            
            {/* Xử lý Đạo diễn (API trả về mảng directors) */}
            <p><strong>Đạo diễn:</strong> {movie.directors?.map(d => d.name).join(', ') || 'N/A'}</p>
            
            {/* Xử lý Thể loại (API trả về mảng strings) */}
            <p><strong>Thể loại:</strong> {movie.genres?.join(', ') || 'N/A'}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-3 border-b pb-2">Tóm tắt nội dung</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {movie.plot_full || movie.short_description || movie.plot || 'Đang cập nhật...'}
            </p>
          </div>
        </div>
      </div>

      {/* --- PHẦN DIỄN VIÊN (ACTORS) --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-3">Diễn viên</h2>
        
        {/* Kiểm tra mảng actors thay vì cast */}
        {movie.actors && movie.actors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movie.actors.map((actor) => (
                <div key={actor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 hover:shadow-md transition-shadow">
                    <div className="w-full h-48 mb-3 overflow-hidden rounded">
                        {/* Ảnh diễn viên */}
                        <img 
                            src={getPosterUrl(actor.image)} 
                            alt={actor.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {e.target.src = 'https://via.placeholder.com/150x200?text=No+Img'}}
                        />
                    </div>
                    <Link to={`/person/${actor.id}`} className="font-bold text-blue-600 hover:underline line-clamp-1">
                        {actor.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">as {actor.character || 'Unknown'}</p>
                </div>
            ))}
            </div>
        ) : (
            <p>Chưa có thông tin diễn viên.</p>
        )}
      </div>

      {/* --- PHẦN REVIEWS --- */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3">Đánh giá từ người xem</h2>
          
          {/* Sort Options */}
          <div className="flex gap-2">
            <button
              onClick={() => setReviewSort('newest')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                reviewSort === 'newest'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Mới nhất
            </button>
            <button
              onClick={() => setReviewSort('oldest')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                reviewSort === 'oldest'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Cũ nhất
            </button>
            <button
              onClick={() => setReviewSort('highest')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                reviewSort === 'highest'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Đánh giá cao
            </button>
          </div>
        </div>

        {reviewsLoading ? (
          <div className="text-center py-8 text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
            <p className="mt-2">Đang tải đánh giá...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Chưa có đánh giá nào cho phim này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => {
              const reviewId = review.id || review._id || Math.random();
              const isExpanded = expandedReviews.has(reviewId);
              const content = review.content || review.review || review.text || '';
              const shouldTruncate = content.length > 300;
              const displayContent = shouldTruncate && !isExpanded
                ? content.slice(0, 300) + '...'
                : content;

              return (
                <div
                  key={reviewId}
                  className="border border-gray-200 dark:border-gray-700 p-5 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                          {review.username || review.author || review.user || 'Anonymous'}
                        </h3>
                        {review.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                              ({review.rating}/10)
                            </span>
                          </div>
                        )}
                      </div>
                      {review.date && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.date).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Review Title */}
                  {review.title && (
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {review.title}
                    </h4>
                  )}

                  {/* Review Content */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {displayContent}
                  </p>

                  {/* Expand/Collapse Button */}
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleReviewExpand(reviewId)}
                      className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>
                          <span>Thu gọn</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>Xem thêm</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}