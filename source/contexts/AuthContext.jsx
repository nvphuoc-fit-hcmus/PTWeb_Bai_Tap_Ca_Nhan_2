import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Kiểm tra user đã login chưa khi load trang
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // Gọi API lấy thông tin user mới nhất để đảm bảo token còn hạn
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token hết hạn hoặc lỗi:', error);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      // API trả về { token, user }
      const { token, user: userData } = response;
      
      localStorage.setItem('accessToken', token);
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Lỗi đăng nhập' };
    }
  };

  const register = async (username, email, password, phone, dob) => {
    try {
      await authService.register(username, email, password, phone, dob);
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message || 'Lỗi đăng ký' };
    }
  };

  const logout = () => {
    authService.logout().catch(() => {}); // Gọi API logout 
    localStorage.removeItem('accessToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phai dung trong AuthProvider');
  }
  return context;
}