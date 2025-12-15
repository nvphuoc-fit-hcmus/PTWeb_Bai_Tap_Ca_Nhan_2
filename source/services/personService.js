import apiClient from '../lib/api';

export const personService = {
  // 1. Search Persons: GET /api/persons
  searchPersons: async (query, page = 1) => {
    try {
      const response = await apiClient.get('/api/persons', {
        params: {
          q: query,
          page,
          limit: 20,
        },
      });
      return response;
    } catch (error) {
      throw error || { message: 'Lỗi tìm kiếm diễn viên' };
    }
  },

  // 2. Person Detail: GET /api/persons/{id}
  getPersonDetail: async (personId) => {
    try {
      const response = await apiClient.get(`/api/persons/${personId}`);
      return response; 
    } catch (error) {
      throw error || { message: 'Lỗi lấy chi tiết người' };
    }
  },

  // Helper cũ (nếu code cũ có dùng)
  getPersonMovies: async (personId) => {
    try {
        const response = await apiClient.get(`/api/persons/${personId}`);
        return { data: response.known_for || [] };
    } catch (error) {
        return { data: [] };
    }
  },
};

export default personService;