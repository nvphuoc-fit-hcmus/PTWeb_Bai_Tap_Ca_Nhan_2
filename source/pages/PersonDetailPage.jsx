import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import personService from '../services/personService';
import Pagination from '../components/Pagination';

export default function PersonDetailPage() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const loadPerson = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await personService.getPersonDetail(id);
        const personData = response.data || response;
        setPerson(personData);
      } catch (err) {
        console.error('Load person error:', err);
        setError('Lỗi tải thông tin người');
      } finally {
        setLoading(false);
      }
    };
    loadPerson();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!person) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Không tìm thấy người</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <img 
            src={person.image || 'https://via.placeholder.com/300x400?text=No+Image'} 
            alt={person.name} 
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {e.target.src = 'https://via.placeholder.com/300x400?text=No+Image'}}
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{person.name}</h1>
          {person.role && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              <strong>Vai trò:</strong> {person.role}
            </p>
          )}
          {person.birth_date && (
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <strong>Ngày sinh:</strong> {new Date(person.birth_date).toLocaleDateString('vi-VN')}
            </p>
          )}
          {person.death_date && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Ngày mất:</strong> {new Date(person.death_date).toLocaleDateString('vi-VN')}
            </p>
          )}
          {person.height && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Chiều cao:</strong> {person.height}
            </p>
          )}
          {person.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Tiểu sử</h2>
              <p className="text-gray-700 dark:text-gray-300">{person.summary}</p>
            </div>
          )}
        </div>
      </div>

      {person.known_for && person.known_for.length > 0 && (() => {
        const totalPages = Math.ceil(person.known_for.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentMovies = person.known_for.slice(startIndex, endIndex);
        
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Danh sách phim nổi tiếng ({person.known_for.length} phim)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentMovies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow group"
                >
                  {movie.image && (
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-40 object-cover rounded mb-3 group-hover:scale-105 transition-transform"
                      onError={(e) => {e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}}
                    />
                  )}
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400 hover:underline group-hover:text-blue-700">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {movie.year} {movie.role && `• ${movie.role}`}
                  </p>
                  {movie.rate && (
                    <p className="text-sm text-yellow-500 mt-1">★ {movie.rate}</p>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        );
      })()}
    </div>
  );
}
