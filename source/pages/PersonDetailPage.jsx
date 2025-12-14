import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import personService from '../services/personService';

export default function PersonDetailPage() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        // Fallback fake data
        setPerson({
          id,
          name: 'Buster Keaton',
          photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Buster_Keaton_restored.jpg/440px-Buster_Keaton_restored.jpg',
          biography: 'Buster Keaton was an American actor and filmmaker. He is often called "The Great Stone Face" because his comedy did not depend on changes of facial expression, but rather on his physical actions and on the extraordinary dynamics, mike, and perception.',
          movies: [
            { id: 1, title: 'Sherlock Jr.', year: 1924, role: 'Actor' },
            { id: 2, title: 'The General', year: 1926, role: 'Actor' },
            { id: 3, title: 'Steamboat Bill Jr.', year: 1928, role: 'Actor' },
          ],
        });
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <img src={person.photo} alt={person.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{person.name}</h1>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Tiểu sử</h2>
            <p className="text-gray-700 dark:text-gray-300">{person.biography}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Danh sách phim tham gia</h2>
        <div className="space-y-3">
          {person.movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-blue-500 hover:underline">{movie.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{movie.year} • {movie.role}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
