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

  // --- PHẦN SỬA ĐỔI QUAN TRỌNG (FAVORITES) ---

  // 7. Thêm vào yêu thích (Sửa URL sang /api/users/favorites)
  addFavourite: async (movieId) => {
    try {
      const response = await apiClient.post(`/api/users/favorites/${movieId}`);
      return response;
    } catch (error) {
      throw error || { message: "Lỗi thêm vào danh sách yêu thích" };
    }
  },

  // 8. Xóa khỏi yêu thích (Sửa URL sang /api/users/favorites)
  removeFavourite: async (movieId) => {
    try {
      const response = await apiClient.delete(`/api/users/favorites/${movieId}`);
      return response;
    } catch (error) {
      throw error || { message: "Lỗi xóa khỏi danh sách yêu thích" };
    }
  },

  // 9. Lấy danh sách yêu thích (Sửa URL sang /api/users/favorites)
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