import apiClient from '../lib/api';

export const movieService = {
  // Tìm kiếm phim theo query
  searchMovies: async (query, page = 1) => {
    try {
      const response = await apiClient.get('/api/movies/search', {
        params: {
          query,
          page,
          limit: 20,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi tìm kiếm phim' };
    }
  },

  // Lấy danh sách phim phổ biến
  getPopular: async (page = 1) => {
    try {
      const response = await apiClient.get('/api/movies/popular', {
        params: {
          page,
          limit: 20,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi lấy danh sách phim phổ biến' };
    }
  },

  // Lấy danh sách phim xếp hạng cao
  getTopRated: async (page = 1) => {
    try {
      const response = await apiClient.get('/api/movies/top-rated', {
        params: {
          page,
          limit: 20,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi lấy danh sách phim xếp hạng cao' };
    }
  },

  // Lấy chi tiết phim theo ID
  getMovieDetail: async (movieId) => {
    try {
      const response = await apiClient.get(`/api/movies/${movieId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi lấy chi tiết phim' };
    }
  },

  // Lấy danh sách diễn viên của phim
  getMovieCast: async (movieId) => {
    try {
      const response = await apiClient.get(`/api/movies/${movieId}/cast`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi lấy danh sách diễn viên' };
    }
  },

  // Thêm phim vào danh sách yêu thích
  addFavourite: async (movieId) => {
    try {
      const response = await apiClient.post(`/api/movies/${movieId}/favourite`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi thêm vào danh sách yêu thích' };
    }
  },

  // Xóa phim khỏi danh sách yêu thích
  removeFavourite: async (movieId) => {
    try {
      const response = await apiClient.delete(`/api/movies/${movieId}/favourite`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi xóa khỏi danh sách yêu thích' };
    }
  },

  // Lấy danh sách yêu thích của user
  getFavourites: async (page = 1) => {
    try {
      const response = await apiClient.get('/api/movies/favourites', {
        params: {
          page,
          limit: 20,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi lấy danh sách yêu thích' };
    }
  },
};

export default movieService;
