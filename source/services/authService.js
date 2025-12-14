import apiClient from '../lib/api';

export const authService = {
  // Login với email và password
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi đăng nhập' };
    }
  },

  // Register với email, password, name
  register: async (name, email, password) => {
    try {
      const response = await apiClient.post('/api/auth/register', {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi đăng ký' };
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/api/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi lấy thông tin user' };
    }
  },
};

export default authService;
