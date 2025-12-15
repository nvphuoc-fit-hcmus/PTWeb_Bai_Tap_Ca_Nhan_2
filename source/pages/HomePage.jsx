import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import movieService from "../services/movieService";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroMovies, setHeroMovies] = useState([]);
  const [popularPage, setPopularPage] = useState(0);
  const [topRatedPage, setTopRatedPage] = useState(0);
  const [allPopularMovies, setAllPopularMovies] = useState([]);
  const [allTopRated, setAllTopRated] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingTopRated, setLoadingTopRated] = useState(false);

  // --- HÀM HỖ TRỢ LẤY LINK ẢNH ---
  const getPosterUrl = (movie) => {
    if (!movie) return "https://via.placeholder.com/500x750?text=Loading";
    let imageUrl = "";
    
    // Kiểm tra các trường ảnh có thể có
    if (movie.image && typeof movie.image === "string" && movie.image.trim() && movie.image !== "string") {
      imageUrl = movie.image;
    } else if (movie.poster && typeof movie.poster === "string" && movie.poster.trim()) {
      imageUrl = movie.poster;
    } else if (movie.poster_path && typeof movie.poster_path === "string" && movie.poster_path.trim()) {
      imageUrl = movie.poster_path;
    } else if (movie.backdrop && typeof movie.backdrop === "string" && movie.backdrop.trim()) {
      imageUrl = movie.backdrop;
    } else if (movie.backdrop_path && typeof movie.backdrop_path === "string" && movie.backdrop_path.trim()) {
      imageUrl = movie.backdrop_path;
    } else if (movie.posterURL && typeof movie.posterURL === "string" && movie.posterURL.trim()) {
      imageUrl = movie.posterURL;
    } else if (movie.posterUrl && typeof movie.posterUrl === "string" && movie.posterUrl.trim()) {
      imageUrl = movie.posterUrl;
    }

    if (imageUrl) {
      // Nếu đã là URL đầy đủ
      if (imageUrl.startsWith("http")) return imageUrl;
      // Nếu là đường dẫn tương đối
      const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
      return `https://image.tmdb.org/t/p/w500${cleanPath}`;
    }
    return "https://via.placeholder.com/500x750?text=No+Image";
  };

  // --- COMPONENT MOVIE CARD VỚI HIỆU ỨNG HOVER ---
  const MovieCard = ({ movie }) => {
    // API trả về IMDB ID trong trường 'id'
    const movieId = movie?.id;
    if (!movieId) {
      console.warn('MovieCard: Missing ID for movie:', movie);
    }
    return (
    <Link
      to={`/movie/${movieId}`}
      className="group relative block h-full w-full"
      onClick={() => {
        console.log('Navigating to movie:', { movieId, title: movie.title });
      }}
    >
      {/* Container chính: Xử lý Scale và Z-index khi hover */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:z-50 group-hover:shadow-2xl bg-gray-200 dark:bg-gray-800">
        
        {/* Ảnh Poster */}
        <img
          src={getPosterUrl(movie)}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300"
          onError={(e) => { e.target.src = "https://via.placeholder.com/500x750?text=No+Image"; }}
        />

        {/* Lớp phủ đen mờ (Gradient Overlay) - Chỉ hiện khi hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Thông tin phim - Chỉ hiện khi hover */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="text-lg font-bold text-white line-clamp-2 drop-shadow-md">
            {movie.title}
          </h3>
          <div className="mt-1 flex items-center justify-between text-sm font-medium text-gray-300">
            <span>{movie.year || (movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A')}</span>
            {(movie.rate || movie.vote_average) && (
              <span className="flex items-center gap-1 text-yellow-400">
                ★ {movie.rate || movie.vote_average}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
    );
  };

  // --- CÁC HÀM LOAD DATA (GIỮ NGUYÊN) ---
  useEffect(() => {
    const loadHero = async () => {
      try {
        const response = await movieService.getMovies(1, 5);
        console.log('Hero movies response:', response);
        setHeroMovies(response.data || []);
      } catch (error) { 
        console.error("Lỗi tải phim Hero:", error); 
        setHeroMovies([]); 
      }
    };
    loadHero();
  }, []);

  useEffect(() => {
    const loadPopular = async () => {
      setLoadingPopular(true);
      try {
        let allMovies = [];
        let page = 1;
        // Fetch cho đến khi có đủ 15-30 movies hoặc hết data
        while (allMovies.length < 30 && page <= 3) {
          const response = await movieService.getPopular(page);
          const movies = response.data || response.results || [];
          if (movies.length === 0) break;
          allMovies = [...allMovies, ...movies.filter((m) => m?.id)];
          page++;
        }
        console.log(`Popular: loaded ${allMovies.length} movies`);
        // Đảm bảo 15-30 movies
        const limitedMovies = allMovies.slice(0, 30);
        setAllPopularMovies(limitedMovies);
      } catch (error) { 
        console.error("Lỗi tải phim popular:", error); 
        setAllPopularMovies([]); 
      } 
      finally { setLoadingPopular(false); }
    };
    loadPopular();
  }, []);

  useEffect(() => {
    const loadTopRated = async () => {
      setLoadingTopRated(true);
      try {
        let allMovies = [];
        let page = 1;
        // Fetch cho đến khi có đủ 15-30 movies hoặc hết data
        while (allMovies.length < 30 && page <= 3) {
          const response = await movieService.getTopRated(page);
          const movies = response.data || response.results || [];
          if (movies.length === 0) break;
          allMovies = [...allMovies, ...movies.filter((m) => m?.id)];
          page++;
        }
        console.log(`TopRated: loaded ${allMovies.length} movies`);
        // Đảm bảo 15-30 movies
        const limitedMovies = allMovies.slice(0, 30);
        setAllTopRated(limitedMovies);
      } catch (error) { 
        console.error("Lỗi tải phim top rated:", error); 
        setAllTopRated([]); 
      } 
      finally { setLoadingTopRated(false); }
    };
    loadTopRated();
  }, []);

  // Fallback data for Hero movies
  const defaultHeroMovies = [
    {
      id: 1,
      title: "Sherlock Jr.",
      year: "1924",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sherlock_Jr._poster.jpg/440px-Sherlock_Jr._poster.jpg",
    },
    {
      id: 2,
      title: "The General",
      year: "1926",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/The_General_1927_Poster.jpg/440px-The_General_1927_Poster.jpg",
    },
    {
      id: 3,
      title: "City Lights",
      year: "1931",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/City_Lights_%281931_theatrical_poster%29.jpg/440px-City_Lights_%281931_theatrical_poster%29.jpg",
    },
    {
      id: 4,
      title: "Nosferatu",
      year: "1922",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nosferatu_1922_poster.jpg/440px-Nosferatu_1922_poster.jpg",
    },
    {
      id: 5,
      title: "Metropolis",
      year: "1927",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Metropolis_%281927%29_poster.jpg/440px-Metropolis_%281927%29_poster.jpg",
    },
  ];

  // Fallback data Popular
  const defaultPopularMovies = [
    {
      id: 4,
      title: "Spider-Man",
      year: "2002",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/0/0c/Spiderman_movie_poster.jpg",
    },
    {
      id: 5,
      title: "Little Mermaid",
      year: "2023",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/6/63/The_Little_Mermaid_%282023_film%29_poster.jpg",
    },
    {
      id: 6,
      title: "Transformers",
      year: "2007",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/6/66/Transformers07.jpg",
    },
    {
      id: 7,
      title: "Avatar",
      year: "2009",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar_%282009_film%29.jpg",
    },
    {
      id: 8,
      title: "Inception",
      year: "2010",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    },
    {
      id: 9,
      title: "Titanic",
      year: "1997",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Titanic_%281997_film%29_poster.jpg",
    },
    {
      id: 10,
      title: "Avengers Endgame",
      year: "2019",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    },
    {
      id: 11,
      title: "Black Panther",
      year: "2018",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/0/06/Black_Panther_%28film%29_poster.jpg",
    },
    {
      id: 12,
      title: "Doctor Strange",
      year: "2016",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/d/d7/Doctor_Strange_poster.jpg",
    },
    {
      id: 13,
      title: "Guardians of the Galaxy",
      year: "2014",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Guardians_of_the_Galaxy_Vol_2_poster.jpg",
    },
    {
      id: 14,
      title: "Thor Ragnarok",
      year: "2017",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/0/0b/Thor_Ragnarok_poster.jpg",
    },
    {
      id: 15,
      title: "Captain America Civil War",
      year: "2016",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg",
    },
    {
      id: 16,
      title: "Iron Man",
      year: "2008",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/e/e6/Iron_Man_%282008_film%29_poster.jpg",
    },
    {
      id: 17,
      title: "The Avengers",
      year: "2012",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/f/f9/The_Avengers_%282012%29_poster.jpg",
    },
    {
      id: 18,
      title: "Age of Ultron",
      year: "2015",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/1/1b/Avengers_Age_of_Ultron_poster.jpg",
    },
    {
      id: 19,
      title: "Black Widow",
      year: "2021",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/0/05/Black_Widow_%282021_film%29_poster.jpg",
    },
    {
      id: 20,
      title: "Shang-Chi",
      year: "2021",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/c/c2/Shang-Chi_and_the_Legend_of_the_Ten_Rings.jpg",
    },
    {
      id: 21,
      title: "Eternals",
      year: "2021",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/a/an/Eternals_poster.jpg",
    },
    {
      id: 22,
      title: "Spider-Man No Way Home",
      year: "2021",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/0/06/Spider-Man_No_Way_Home_poster.jpg",
    },
    {
      id: 23,
      title: "Doctor Strange Multiverse",
      year: "2022",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/9/95/Doctor_Strange_in_the_Multiverse_of_Madness.jpg",
    },
  ];

  // Fallback data Top Rated
  const defaultTopRated = [
    {
      id: 7,
      title: "The Shawshank Redemption",
      year: "1994",
      rating: "9.3",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    },
    {
      id: 8,
      title: "The Godfather",
      year: "1972",
      rating: "9.2",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    },
    {
      id: 9,
      title: "The Dark Knight",
      year: "2008",
      rating: "9.0",
      poster: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
    },
    {
      id: 24,
      title: "Pulp Fiction",
      year: "1994",
      rating: "8.9",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/8/8b/Pulp_Fiction_poster.jpg",
    },
    {
      id: 25,
      title: "Forrest Gump",
      year: "1994",
      rating: "8.8",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    },
    {
      id: 26,
      title: "Inception",
      year: "2010",
      rating: "8.8",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    },
    {
      id: 27,
      title: "Fight Club",
      year: "1999",
      rating: "8.8",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
    },
    {
      id: 28,
      title: "The Matrix",
      year: "1999",
      rating: "8.7",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    },
    {
      id: 29,
      title: "Goodfellas",
      year: "1990",
      rating: "8.7",
      poster: "https://upload.wikimedia.org/wikipedia/en/8/83/Goodfellas.jpg",
    },
    {
      id: 30,
      title: "The Silence of the Lambs",
      year: "1991",
      rating: "8.6",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
    },
    {
      id: 31,
      title: "Se7en",
      year: "1995",
      rating: "8.6",
      poster: "https://upload.wikimedia.org/wikipedia/en/a/a5/Se7en.jpg",
    },
    {
      id: 32,
      title: "Parasite",
      year: "2019",
      rating: "8.6",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
    },
    {
      id: 33,
      title: "Saving Private Ryan",
      year: "1998",
      rating: "8.6",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_private_ryan_ver2.jpg",
    },
    {
      id: 34,
      title: "The Green Mile",
      year: "1999",
      rating: "8.6",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/5/51/The_Green_Mile_poster.jpg",
    },
    {
      id: 35,
      title: "Interstellar",
      year: "2014",
      rating: "8.6",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/0/0b/Interstellar_film_poster.jpg",
    },
    {
      id: 36,
      title: "The Usual Suspects",
      year: "1995",
      rating: "8.5",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/The_Usual_Suspects_poster.jpg",
    },
    {
      id: 37,
      title: "Gladiator",
      year: "2000",
      rating: "8.5",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/6/6f/Gladiator_%282000%29_poster.jpg",
    },
    {
      id: 38,
      title: "The Prestige",
      year: "2006",
      rating: "8.5",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/b/b8/The_Prestige_poster.jpg",
    },
    {
      id: 39,
      title: "The Departed",
      year: "2006",
      rating: "8.5",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/3/3a/The_Departed_poster.jpg",
    },
    {
      id: 40,
      title: "Whiplash",
      year: "2014",
      rating: "8.5",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/3/33/Whiplash_%282014%29_poster.jpg",
    },
  ];

// Logic hiển thị
  const heroMoviesData = heroMovies.length > 0 ? heroMovies : defaultHeroMovies;
  const currentHeroMovie = heroMoviesData.length > 0 ? heroMoviesData[heroIndex] : null;
  const itemsPerPage = 3; // 3 movies mỗi trang

  const popularMoviesData = allPopularMovies;
  const popularMaxPage = Math.max(1, Math.ceil(popularMoviesData.length / itemsPerPage));
  const currentPopularMovies = popularMoviesData.slice(popularPage * itemsPerPage, (popularPage + 1) * itemsPerPage);

  const topRatedData = allTopRated;
  const topRatedMaxPage = Math.max(1, Math.ceil(topRatedData.length / itemsPerPage));
  const currentTopRated = topRatedData.slice(topRatedPage * itemsPerPage, (topRatedPage + 1) * itemsPerPage);

  return (
    <div className="space-y-14 bg-white text-gray-900 pb-10 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="container mx-auto px-4 md:px-12 max-w-[1200px]">

        {currentHeroMovie ? (
          <div className="relative flex items-center justify-center gap-6">
            {/* Left Arrow */}
            <button 
              onClick={() => setHeroIndex((heroIndex - 1 + heroMoviesData.length) % heroMoviesData.length)} 
              className="absolute left-0 z-20 p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>

            {/* Large Movie Card - Fixed Width Container */}
            <div className="w-full max-w-md mx-auto px-12">
              <MovieCard movie={currentHeroMovie} />
            </div>

            {/* Right Arrow */}
            <button 
              onClick={() => setHeroIndex((heroIndex + 1) % heroMoviesData.length)} 
              className="absolute right-0 z-20 p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
          </div>
        ) : (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </section>

      {/* MOST POPULAR */}
      <section className="container mx-auto px-4 md:px-12 max-w-[1200px]">
        <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-6">Most Popular</h2>

        <div className="relative flex items-center gap-4">
          {/* Left Arrow */}
          <button 
            onClick={() => setPopularPage(Math.max(0, popularPage - 1))} 
            disabled={popularPage === 0 || popularMoviesData.length === 0} 
            className="absolute left-0 z-20 p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm rounded-full shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>

          {/* Grid phim với hiệu ứng hover */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4 px-12 w-full"> 
          {currentPopularMovies.map((movie) => (
            <div key={movie.id || movie._id} className="relative z-0 hover:z-10 transition-all duration-300">
                <MovieCard movie={movie} />
            </div>
          ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => setPopularPage(Math.min(popularMaxPage - 1, popularPage + 1))} 
            disabled={popularPage >= popularMaxPage - 1 || popularMoviesData.length === 0} 
            className="absolute right-0 z-20 p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm rounded-full shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>
      </section>

      {/* TOP RATING */}
      <section className="container mx-auto px-4 md:px-12 max-w-[1200px]">
        <h2 className="text-2xl font-bold border-l-4 border-yellow-500 pl-3 mb-6">Top Rating</h2>

        <div className="relative flex items-center gap-4">
          {/* Left Arrow */}
          <button 
            onClick={() => setTopRatedPage(Math.max(0, topRatedPage - 1))} 
            disabled={topRatedPage === 0 || topRatedData.length === 0} 
            className="absolute left-0 z-20 p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm rounded-full shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>

          {/* Grid phim */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4 px-12 w-full">
          {currentTopRated.map((movie) => (
            <div key={movie.id || movie._id} className="relative z-0 hover:z-10 transition-all duration-300">
                <MovieCard movie={movie} />
            </div>
          ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => setTopRatedPage(Math.min(topRatedMaxPage - 1, topRatedPage + 1))} 
            disabled={topRatedPage >= topRatedMaxPage - 1 || topRatedData.length === 0} 
            className="absolute right-0 z-20 p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm rounded-full shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>
      </section>
    </div>
  );
}