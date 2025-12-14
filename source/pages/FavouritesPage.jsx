import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // TODO: Ket noi API that, tam thoi fake data
    setFavourites([
      { id: 1, title: 'The Matrix', year: '1999', poster: 'https://via.placeholder.com/300x200?text=The+Matrix' },
      { id: 2, title: 'Inception', year: '2010', poster: 'https://via.placeholder.com/300x200?text=Inception' },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Danh sách phim yêu thích</h1>
      {favourites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Bạn chưa thêm phim yêu thích nào.</p>
          <Link to="/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favourites.map((movie) => (
            <div key={movie.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg">
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white">{movie.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{movie.year}</p>
                <button className="mt-3 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
