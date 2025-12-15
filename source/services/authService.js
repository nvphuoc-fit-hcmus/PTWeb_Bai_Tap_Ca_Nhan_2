import apiClient from '../lib/api';

export const authService = {
  // Login: POST /api/users/login
  login: async (username, password) => {
    try {
      const response = await apiClient.post('/api/users/login', {
        username,
        password,
      });
      return response; 
    } catch (error) {
      throw error || { message: 'Lỗi đăng nhập' };
    }
  },

  // Register: POST /api/users/register
  register: async (username, email, password, phone, dob) => {
    try {
      const response = await apiClient.post('/api/users/register', {
        username,
        email,
        password,
        phone,
        dob
      });
      return response;
    } catch (error) {
      throw error || { message: 'Lỗi đăng ký' };
    }
  },

  // Get Profile: GET /api/users/profile
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/api/users/profile');
      return response;
    } catch (error) {
      throw error || { message: 'Lỗi lấy thông tin user' };
    }
  },

  // Logout: POST /api/users/logout
  logout: async () => {
    try {
      const response = await apiClient.post('/api/users/logout');
      return response;
    } catch (error) {
      throw error || { message: 'Lỗi đăng xuất' };
    }
  },
  
  // Update Profile: PATCH /api/users/profile
  updateProfile: async (data) => {
    try {
      // Lưu ý: Cần đảm bảo api.js có hàm request hoặc patch
      const response = await apiClient.request('/api/users/profile', {
          method: 'PATCH',
          body: data
      });
      return response;
    } catch (error) {
      throw error || { message: 'Lỗi cập nhật profile' };
    }
  }
};

export default authService;