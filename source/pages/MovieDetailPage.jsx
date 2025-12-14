import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MovieDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [movie, setMovie] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    // TODO: Ket noi API that, tam thoi fake data
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
      poster: 'https://via.placeholder.com/300x450?text=Sherlock+Jr',
    });
  }, [id]);

  if (!movie) {
    return <div className="text-center py-12">Đang tải...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <img src={movie.poster} alt={movie.title} className="w-full rounded-lg shadow-lg" />
          {isAuthenticated && (
            <button
              onClick={() => setIsFavourite(!isFavourite)}
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
