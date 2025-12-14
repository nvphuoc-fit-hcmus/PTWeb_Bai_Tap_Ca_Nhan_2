import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);

  // Static images để mô phỏng poster đúng yêu cầu thị giác
  const topMovies = [
    {
      id: 1,
      title: 'Sherlock Jr.',
      year: '1924',
      poster:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sherlock_Jr._poster.jpg/440px-Sherlock_Jr._poster.jpg',
    },
    {
      id: 2,
      title: 'The General',
      year: '1926',
      poster:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/The_General_1927_Poster.jpg/440px-The_General_1927_Poster.jpg',
    },
    {
      id: 3,
      title: 'City Lights',
      year: '1931',
      poster:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/City_Lights_%281931_theatrical_poster%29.jpg/440px-City_Lights_%281931_theatrical_poster%29.jpg',
    },
  ];

  const popularMovies = [
    {
      id: 4,
      title: 'Spider-Man',
      year: '2002',
      poster: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Spiderman_movie_poster.jpg',
    },
    {
      id: 5,
      title: 'Little Mermaid',
      year: '2023',
      poster: 'https://upload.wikimedia.org/wikipedia/en/6/63/The_Little_Mermaid_%282023_film%29_poster.jpg',
    },
    {
      id: 6,
      title: 'Transformers',
      year: '2007',
      poster: 'https://upload.wikimedia.org/wikipedia/en/6/66/Transformers07.jpg',
    },
  ];

  const topRated = [
    {
      id: 7,
      title: 'The Shawshank Redemption',
      year: '1994',
      rating: '9.3',
      poster: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
    },
    {
      id: 8,
      title: 'The Godfather',
      year: '1972',
      rating: '9.2',
      poster: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
    },
    {
      id: 9,
      title: 'The Dark Knight',
      year: '2008',
      rating: '9.0',
      poster: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg',
    },
  ];

  const currentMovie = topMovies[heroIndex];

  return (
    <div className="space-y-14 bg-white text-gray-900">
      {/* Hero Section - Poster lớn ở giữa */}
      <section className="relative bg-white">
        <div className="flex justify-center items-center relative">
          <button
            onClick={() => setHeroIndex((heroIndex - 1 + topMovies.length) % topMovies.length)}
            className="absolute -left-4 md:-left-10 z-10 p-3 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 shadow"
            aria-label="Previous hero"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="w-full max-w-md">
            <img
              src={currentMovie.poster}
              alt={currentMovie.title}
              className="w-full rounded-lg shadow-2xl border border-gray-200"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-gray-900">{currentMovie.title}</h3>
              <p className="text-gray-600">{currentMovie.year}</p>
            </div>
          </div>

          <button
            onClick={() => setHeroIndex((heroIndex + 1) % topMovies.length)}
            className="absolute -right-4 md:-right-10 z-10 p-3 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 shadow"
            aria-label="Next hero"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Most Popular */}
      <section className="relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Most Popular</h2>
        </div>

        <div className="relative">
          <button
            className="absolute -left-3 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 shadow"
            aria-label="Prev popular"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-5 overflow-hidden px-6">
            {popularMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 w-full max-w-sm"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900">{movie.title}</h3>
                  <p className="text-gray-600">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute -right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 shadow"
            aria-label="Next popular"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Top Rating */}
      <section className="relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Top Rating</h2>
        </div>

        <div className="relative">
          <button
            className="absolute -left-3 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 shadow"
            aria-label="Prev top rated"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-5 overflow-hidden px-6">
            {topRated.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 w-full max-w-sm"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900">{movie.title}</h3>
                  <p className="text-gray-600">
                    {movie.year} • Rating: {movie.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute -right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 shadow"
            aria-label="Next top rated"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
