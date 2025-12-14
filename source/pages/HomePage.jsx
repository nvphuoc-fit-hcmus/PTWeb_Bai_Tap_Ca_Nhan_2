import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);

  // Fake data để test giao diện
  const topMovies = [
    { id: 1, title: 'Sherlock Jr.', year: '1924', poster: 'https://via.placeholder.com/300x450?text=Sherlock+Jr' },
    { id: 2, title: 'The General', year: '1926', poster: 'https://via.placeholder.com/300x450?text=The+General' },
    { id: 3, title: 'City Lights', year: '1931', poster: 'https://via.placeholder.com/300x450?text=City+Lights' },
  ];

  const popularMovies = [
    { id: 4, title: 'Spider-Man', year: '2002', poster: 'https://via.placeholder.com/300x200?text=Spider-Man' },
    { id: 5, title: 'Little Mermaid', year: '2023', poster: 'https://via.placeholder.com/300x200?text=Little+Mermaid' },
    { id: 6, title: 'Transformers', year: '2007', poster: 'https://via.placeholder.com/300x200?text=Transformers' },
  ];

  const topRated = [
    { id: 7, title: 'The Shawshank Redemption', year: '1994', rating: '9.3', poster: 'https://via.placeholder.com/300x200?text=Shawshank' },
    { id: 8, title: 'The Godfather', year: '1972', rating: '9.2', poster: 'https://via.placeholder.com/300x200?text=Godfather' },
    { id: 9, title: 'The Dark Knight', year: '2008', rating: '9.0', poster: 'https://via.placeholder.com/300x200?text=Dark+Knight' },
  ];

  const currentMovie = topMovies[heroIndex];

  return (
    <div className="space-y-12">
      {/* Hero Section - Poster lớn ở giữa */}
      <section className="relative">
        <div className="flex justify-center items-center relative">
          {/* Mũi tên trái */}
          <button
            onClick={() => setHeroIndex((heroIndex - 1 + topMovies.length) % topMovies.length)}
            className="absolute left-0 z-10 p-2 bg-gray-500/50 hover:bg-gray-500/70 rounded-full text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Poster chính */}
          <div className="w-full max-w-md">
            <img
              src={currentMovie.poster}
              alt={currentMovie.title}
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {currentMovie.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{currentMovie.year}</p>
            </div>
          </div>

          {/* Mũi tên phải */}
          <button
            onClick={() => setHeroIndex((heroIndex + 1) % topMovies.length)}
            className="absolute right-0 z-10 p-2 bg-gray-500/50 hover:bg-gray-500/70 rounded-full text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Most Popular */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Most Popular
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{movie.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rating */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Top Rating
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRated.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{movie.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {movie.year} • Rating: {movie.rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
