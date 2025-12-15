import apiClient from "../lib/api";

export const movieService = {
  // 1. Lấy danh sách phim (Get list of movies)
  getMovies: async (page = 1, limit = 10) => {
    try {
      const response = await apiClient.get("/api/movies", {
        params: { page, limit },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy danh sách phim" };
    }
  },

  // 2. Tìm kiếm phim
  searchMovies: async (query, page = 1) => {
    try {
      const response = await apiClient.get("/api/movies/search", {
        params: {
          q: query, // <-- SỬA TÊN THAM SỐ Ở ĐÂY CHO KHỚP API
          page,
          limit: 20,
        },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi tìm kiếm phim" };
    }
  },

  // 3. Lấy danh sách phim phổ biến (SỬA URL: popular -> most-popular)
  getPopular: async (page = 1) => {
    try {
      const response = await apiClient.get("/api/movies/most-popular", {
        params: {
          page,
          limit: 20,
        },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy danh sách phim phổ biến" };
    }
  },

  // 4. Lấy danh sách phim xếp hạng cao
  getTopRated: async (page = 1) => {
    try {
      const response = await apiClient.get("/api/movies/top-rated", {
        params: {
          page,
          limit: 20,
        },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy danh sách phim xếp hạng cao" };
    }
  },

  // 5. Lấy chi tiết phim theo ID
  getMovieDetail: async (movieId) => {
    try {
      const response = await apiClient.get(`/api/movies/${movieId}`);
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy chi tiết phim" };
    }
  },

  // 6. Lấy danh sách diễn viên của phim
  getMovieCast: async (movieId) => {
    try {
        const response = await apiClient.get(`/api/movies/${movieId}`);
        return { cast: response.actors || [] }; 
    } catch (error) {
      return { cast: [] };
    }
  },

  // 7. Thêm phim vào danh sách yêu thích
  addFavourite: async (movieId) => {
    try {
      const response = await apiClient.post(`/api/movies/${movieId}/favourite`);
      return response;
    } catch (error) {
      throw error || { message: "Lỗi thêm vào danh sách yêu thích" };
    }
  },

  // 8. Xóa phim khỏi danh sách yêu thích
  removeFavourite: async (movieId) => {
    try {
      const response = await apiClient.delete(
        `/api/movies/${movieId}/favourite`
      );
      return response;
    } catch (error) {
      throw error || { message: "Lỗi xóa khỏi danh sách yêu thích" };
    }
  },

  // 9. Lấy danh sách yêu thích của user
  getFavourites: async (page = 1) => {
    try {
      const response = await apiClient.get("/api/movies/favourites", {
        params: {
          page,
          limit: 20,
        },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy danh sách yêu thích" };
    }
  },
};

export default movieService;
