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

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await movieService.getMovieDetail(id);
        const movieData = response.data || response;
        setMovie(movieData);
      } catch (err) {
        console.error('Load movie error:', err);
        setError('Lỗi tải thông tin phim');
        // Fallback fake data
        setMovie({
          id,
          title: 'Sherlock Jr.',
          year: 1924,
          rated: 'Not Rated',
          length: '45m',
          director: 'Buster Keaton',
          genres: ['Comedy', 'Drama'],
          plot: 'A film projectionist longs to be a detective. When a crime is committed in his town, he tries to catch the culprit.',
          cast: [
            { id: 1, name: 'Buster Keaton', character: 'Sherlock Jr.' },
            { id: 2, name: 'Kathryn McGuire', character: 'The Girl' },
          ],
          poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sherlock_Jr._poster.jpg/440px-Sherlock_Jr._poster.jpg',
        });
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

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
    }
  };
  }
  if (loading) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Đang tải...</div>;

  return (
  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Không tìm thấy phim</div>;
  }
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <img src={movie.poster} alt={movie.title} className="w-full rounded-lg shadow-lg" />
          {isAuthenticated && (
            <button
              onClick={handleFavourite}
              className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" fill={isFavourite ? 'currentColor' : 'none'} />
              {isFavourite ? 'Đã thích' : 'Thêm vào yêu thích'}
            </button>
          )}
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{movie.title}</h1>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
            <p><strong>Năm:</strong> {movie.year}</p>
            <p><strong>Rated:</strong> {movie.rated}</p>
            <p><strong>Thời lượng:</strong> {movie.length}</p>
            <p><strong>Đạo diễn:</strong> {movie.director}</p>
            <p><strong>Thể loại:</strong> {movie.genres.join(', ')}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Tóm tắt</h2>
            <p className="text-gray-700 dark:text-gray-300">{movie.plot}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Diễn viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {movie.cast.map((actor) => (
            <div key={actor.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Link to={`/person/${actor.id}`} className="text-blue-500 hover:underline font-semibold">
                {actor.name}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">vai trò: {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
