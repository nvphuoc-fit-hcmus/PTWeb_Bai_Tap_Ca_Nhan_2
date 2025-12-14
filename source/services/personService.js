import apiClient from '../lib/api';

export const personService = {
  // Lấy chi tiết người (diễn viên, đạo diễn, ...)
  getPersonDetail: async (personId) => {
    try {
      const response = await apiClient.get(`/api/people/${personId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi lấy chi tiết người' };
    }
  },

  // Lấy danh sách phim của một người
  getPersonMovies: async (personId, page = 1) => {
    try {
      const response = await apiClient.get(`/api/people/${personId}/movies`, {
        params: {
          page,
          limit: 20,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi lấy danh sách phim' };
    }
  },
};

export default personService;
