import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Trang cá nhân</h1>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tên:</label>
          <p className="text-lg text-gray-800 dark:text-white mt-1">{user?.name || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email:</label>
          <p className="text-lg text-gray-800 dark:text-white mt-1">{user?.email}</p>
        </div>
        <Link
          to="/favourites"
          className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
        >
          Xem danh sách yêu thích
        </Link>
      </div>
    </div>
  );
}
