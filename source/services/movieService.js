import apiClient from "../lib/api";

export const movieService = {
  // 1. Lấy danh sách phim
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
          q: query,
          page,
          limit: 20,
        },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi tìm kiếm phim" };
    }
  },

  // 3. Phim phổ biến
  getPopular: async (page = 1) => {
    try {
      const response = await apiClient.get("/api/movies/most-popular", {
        params: { page, limit: 20 },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy danh sách phim phổ biến" };
    }
  },

  // 4. Phim xếp hạng cao
  getTopRated: async (page = 1) => {
    try {
      const response = await apiClient.get("/api/movies/top-rated", {
        params: { page, limit: 20 },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy danh sách phim xếp hạng cao" };
    }
  },

  // 5. Chi tiết phim
  getMovieDetail: async (movieId) => {
    try {
      const response = await apiClient.get(`/api/movies/${movieId}`);
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy chi tiết phim" };
    }
  },

  // 6. Lấy danh sách diễn viên (Wrapper)
  getMovieCast: async (movieId) => {
    try {
        const response = await apiClient.get(`/api/movies/${movieId}`);
        return { cast: response.actors || [] }; 
    } catch (error) {
      return { cast: [] };
    }
  },

  // 7. Lấy danh sách review của phim
  getMovieReviews: async (movieId, page = 1, limit = 10, sort = 'newest') => {
    try {
      const response = await apiClient.get(`/api/movies/${movieId}/reviews`, {
        params: { page, limit, sort },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy đánh giá phim" };
    }
  },

  // 8. Lấy danh sách diễn viên
  getPersons: async (query = '', page = 1, limit = 10) => {
    try {
      const response = await apiClient.get("/api/persons", {
        params: { q: query, page, limit },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy danh sách diễn viên" };
    }
  },

  // 9. Chi tiết diễn viên
  getPersonDetail: async (personId) => {
    try {
      const response = await apiClient.get(`/api/persons/${personId}`);
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy chi tiết diễn viên" };
    }
  },

  // --- PHẦN QUẢN LÝ FAVORITES ---

  // 10. Thêm vào yêu thích
  addFavourite: async (movieId) => {
    try {
      const response = await apiClient.post(`/api/users/favorites/${movieId}`);
      return response;
    } catch (error) {
      throw error || { message: "Lỗi thêm vào danh sách yêu thích" };
    }
  },

  // 11. Xóa khỏi yêu thích
  removeFavourite: async (movieId) => {
    try {
      const response = await apiClient.del(`/api/users/favorites/${movieId}`);
      return response;
    } catch (error) {
      throw error || { message: "Lỗi xóa khỏi danh sách yêu thích" };
    }
  },

  // 12. Lấy danh sách yêu thích
  getFavourites: async (page = 1) => {
    try {
      const response = await apiClient.get("/api/users/favorites", {
        params: { page, limit: 20 },
      });
      return response;
    } catch (error) {
      throw error || { message: "Lỗi lấy danh sách yêu thích" };
    }
  },
};

export default movieService;