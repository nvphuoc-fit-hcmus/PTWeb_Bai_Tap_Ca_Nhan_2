import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import movieService from '../services/movieService';

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [popularPage, setPopularPage] = useState(0);
  const [topRatedPage, setTopRatedPage] = useState(0);
  const [allPopularMovies, setAllPopularMovies] = useState([]);
  const [allTopRated, setAllTopRated] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingTopRated, setLoadingTopRated] = useState(false);

  // Load popular movies
  useEffect(() => {
    const loadPopular = async () => {
      setLoadingPopular(true);
      try {
        const response = await movieService.getPopular(1);
        const movies = response.data || response.results || [];
        setAllPopularMovies(movies.slice(0, 20));
      } catch (error) {
        console.error('Loi tai phim popular:', error);
        // Fallback to fake data
        setAllPopularMovies([
          { id: 4, title: 'Spider-Man', year: '2002', poster: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Spiderman_movie_poster.jpg' },
          { id: 5, title: 'Little Mermaid', year: '2023', poster: 'https://upload.wikimedia.org/wikipedia/en/6/63/The_Little_Mermaid_%282023_film%29_poster.jpg' },
          { id: 6, title: 'Transformers', year: '2007', poster: 'https://upload.wikimedia.org/wikipedia/en/6/66/Transformers07.jpg' },
        ]);
      } finally {
        setLoadingPopular(false);
      }
    };
    loadPopular();
  }, []);

  // Load top rated movies
  useEffect(() => {
    const loadTopRated = async () => {
      setLoadingTopRated(true);
      try {
        const response = await movieService.getTopRated(1);
        const movies = response.data || response.results || [];
        setAllTopRated(movies.slice(0, 20));
      } catch (error) {
        console.error('Loi tai phim top rated:', error);
        // Fallback to fake data
        setAllTopRated([
          { id: 7, title: 'The Shawshank Redemption', year: '1994', rating: '9.3', poster: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg' },
          { id: 8, title: 'The Godfather', year: '1972', rating: '9.2', poster: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg' },
          { id: 9, title: 'The Dark Knight', year: '2008', rating: '9.0', poster: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg' },
        ]);
      } finally {
        setLoadingTopRated(false);
      }
    };
    loadTopRated();
  }, []);

  // 5 phim doanh thu cao nhất (Hero)
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
    {
      id: 4,
      title: 'Nosferatu',
      year: '1922',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nosferatu_1922_poster.jpg/440px-Nosferatu_1922_poster.jpg',
    },
    {
      id: 5,
      title: 'Metropolis',
      year: '1927',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Metropolis_%281927%29_poster.jpg/440px-Metropolis_%281927%29_poster.jpg',
    },
  ];

  // Fallback 20 phim phổ biến (nếu API không trả về)
  const defaultPopularMovies = [
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
    {
      id: 7,
      title: 'Avatar',
      year: '2009',
      poster: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar_%282009_film%29.jpg',
    },
    {
      id: 8,
      title: 'Inception',
      year: '2010',
      poster: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    },
    {
      id: 9,
      title: 'Titanic',
      year: '1997',
      poster: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Titanic_%281997_film%29_poster.jpg',
    },
    {
      id: 10,
      title: 'Avengers Endgame',
      year: '2019',
      poster: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
    },
    {
      id: 11,
      title: 'Black Panther',
      year: '2018',
      poster: 'https://upload.wikimedia.org/wikipedia/en/0/06/Black_Panther_%28film%29_poster.jpg',
    },
    {
      id: 12,
      title: 'Doctor Strange',
      year: '2016',
      poster: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Doctor_Strange_poster.jpg',
    },
    {
      id: 13,
      title: 'Guardians of the Galaxy',
      year: '2014',
      poster: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Guardians_of_the_Galaxy_Vol_2_poster.jpg',
    },
    {
      id: 14,
      title: 'Thor Ragnarok',
      year: '2017',
      poster: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Thor_Ragnarok_poster.jpg',
    },
    {
      id: 15,
      title: 'Captain America Civil War',
      year: '2016',
      poster: 'https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg',
    },
    {
      id: 16,
      title: 'Iron Man',
      year: '2008',
      poster: 'https://upload.wikimedia.org/wikipedia/en/e/e6/Iron_Man_%282008_film%29_poster.jpg',
    },
    {
      id: 17,
      title: 'The Avengers',
      year: '2012',
      poster: 'https://upload.wikimedia.org/wikipedia/en/f/f9/The_Avengers_%282012%29_poster.jpg',
    },
    {
      id: 18,
      title: 'Age of Ultron',
      year: '2015',
      poster: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Avengers_Age_of_Ultron_poster.jpg',
    },
    {
      id: 19,
      title: 'Black Widow',
      year: '2021',
      poster: 'https://upload.wikimedia.org/wikipedia/en/0/05/Black_Widow_%282021_film%29_poster.jpg',
    },
    {
      id: 20,
      title: 'Shang-Chi',
      year: '2021',
      poster: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Shang-Chi_and_the_Legend_of_the_Ten_Rings.jpg',
    },
    {
      id: 21,
      title: 'Eternals',
      year: '2021',
      poster: 'https://upload.wikimedia.org/wikipedia/en/a/an/Eternals_poster.jpg',
    },
    {
      id: 22,
      title: 'Spider-Man No Way Home',
      year: '2021',
      poster: 'https://upload.wikimedia.org/wikipedia/en/0/06/Spider-Man_No_Way_Home_poster.jpg',
    },
    {
      id: 23,
      title: 'Doctor Strange Multiverse',
      year: '2022',
      poster: 'https://upload.wikimedia.org/wikipedia/en/9/95/Doctor_Strange_in_the_Multiverse_of_Madness.jpg',
    },
  ];

  // Fallback 20 phim top rating (nếu API không trả về)
  const defaultTopRated = [
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
    {
      id: 24,
      title: 'Pulp Fiction',
      year: '1994',
      rating: '8.9',
      poster: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Pulp_Fiction_poster.jpg',
    },
    {
      id: 25,
      title: 'Forrest Gump',
      year: '1994',
      rating: '8.8',
      poster: 'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg',
    },
    {
      id: 26,
      title: 'Inception',
      year: '2010',
      rating: '8.8',
      poster: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    },
    {
      id: 27,
      title: 'Fight Club',
      year: '1999',
      rating: '8.8',
      poster: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg',
    },
    {
      id: 28,
      title: 'The Matrix',
      year: '1999',
      rating: '8.7',
      poster: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    },
    {
      id: 29,
      title: 'Goodfellas',
      year: '1990',
      rating: '8.7',
      poster: 'https://upload.wikimedia.org/wikipedia/en/8/83/Goodfellas.jpg',
    },
    {
      id: 30,
      title: 'The Silence of the Lambs',
      year: '1991',
      rating: '8.6',
      poster: 'https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg',
    },
    {
      id: 31,
      title: 'Se7en',
      year: '1995',
      rating: '8.6',
      poster: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Se7en.jpg',
    },
    {
      id: 32,
      title: 'Parasite',
      year: '2019',
      rating: '8.6',
      poster: 'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png',
    },
    {
      id: 33,
      title: 'Saving Private Ryan',
      year: '1998',
      rating: '8.6',
      poster: 'https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_private_ryan_ver2.jpg',
    },
    {
      id: 34,
      title: 'The Green Mile',
      year: '1999',
      rating: '8.6',
      poster: 'https://upload.wikimedia.org/wikipedia/en/5/51/The_Green_Mile_poster.jpg',
    },
    {
      id: 35,
      title: 'Interstellar',
      year: '2014',
      rating: '8.6',
      poster: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Interstellar_film_poster.jpg',
    },
    {
      id: 36,
      title: 'The Usual Suspects',
      year: '1995',
      rating: '8.5',
      poster: 'https://upload.wikimedia.org/wikipedia/en/2/2e/The_Usual_Suspects_poster.jpg',
    },
    {
      id: 37,
      title: 'Gladiator',
      year: '2000',
      rating: '8.5',
      poster: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Gladiator_%282000%29_poster.jpg',
    },
    {
      id: 38,
      title: 'The Prestige',
      year: '2006',
      rating: '8.5',
      poster: 'https://upload.wikimedia.org/wikipedia/en/b/b8/The_Prestige_poster.jpg',
    },
    {
      id: 39,
      title: 'The Departed',
      year: '2006',
      rating: '8.5',
      poster: 'https://upload.wikimedia.org/wikipedia/en/3/3a/The_Departed_poster.jpg',
    },
    {
      id: 40,
      title: 'Whiplash',
      year: '2014',
      rating: '8.5',
      poster: 'https://upload.wikimedia.org/wikipedia/en/3/33/Whiplash_%282014%29_poster.jpg',
    },
  ];

  const currentMovie = topMovies[heroIndex];
  const itemsPerPage = 3;

  // Phân trang Most Popular (dùng data từ API hoặc fallback)
  const popularMoviesData = allPopularMovies.length > 0 ? allPopularMovies : defaultPopularMovies;
  const popularStart = popularPage * itemsPerPage;
  const popularEnd = popularStart + itemsPerPage;
  const currentPopularMovies = popularMoviesData.slice(popularStart, popularEnd);
  const popularMaxPage = Math.ceil(popularMoviesData.length / itemsPerPage);

  // Phân trang Top Rating (dùng data từ API hoặc fallback)
  const topRatedData = allTopRated.length > 0 ? allTopRated : defaultTopRated;
  const topRatedStart = topRatedPage * itemsPerPage;
  const topRatedEnd = topRatedStart + itemsPerPage;
  const currentTopRated = topRatedData.slice(topRatedStart, topRatedEnd);
  const topRatedMaxPage = Math.ceil(topRatedData.length / itemsPerPage);

  return (
    <div className="space-y-14 bg-white text-gray-900">
      {/* Hero Section - 5 phim doanh thu cao */}
      <section className="relative bg-white">
        <div className="flex justify-center items-center relative py-8">
          <button
            onClick={() => setHeroIndex((heroIndex - 1 + topMovies.length) % topMovies.length)}
            className="absolute -left-8 z-10 p-3 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 shadow"
            aria-label="Previous hero"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="w-full max-w-sm">
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
            className="absolute -right-8 z-10 p-3 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 shadow"
            aria-label="Next hero"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Most Popular - phân trang 3 phim/trang */}
      <section className="relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Most Popular</h2>
        </div>

        <div className="relative">
          <button
            onClick={() => setPopularPage(Math.max(0, popularPage - 1))}
            disabled={popularPage === 0}
            className="absolute -left-5 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-full text-gray-700 shadow z-10"
            aria-label="Prev popular"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-3 gap-5">
            {currentPopularMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-base text-gray-900 truncate">{movie.title}</h3>
                  <p className="text-gray-600 text-sm">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPopularPage(Math.min(popularMaxPage - 1, popularPage + 1))}
            disabled={popularPage >= popularMaxPage - 1}
            className="absolute -right-5 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-full text-gray-700 shadow z-10"
            aria-label="Next popular"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: popularMaxPage }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPopularPage(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === popularPage ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Page ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Top Rating - phân trang 3 phim/trang */}
      <section className="relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Top Rating</h2>
        </div>

        <div className="relative">
          <button
            onClick={() => setTopRatedPage(Math.max(0, topRatedPage - 1))}
            disabled={topRatedPage === 0}
            className="absolute -left-5 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-full text-gray-700 shadow z-10"
            aria-label="Prev top rated"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-3 gap-5">
            {currentTopRated.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-base text-gray-900 truncate">{movie.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {movie.year} • Rating: {movie.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setTopRatedPage(Math.min(topRatedMaxPage - 1, topRatedPage + 1))}
            disabled={topRatedPage >= topRatedMaxPage - 1}
            className="absolute -right-5 top-1/2 -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-full text-gray-700 shadow z-10"
            aria-label="Next top rated"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: topRatedMaxPage }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setTopRatedPage(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === topRatedPage ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Page ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
