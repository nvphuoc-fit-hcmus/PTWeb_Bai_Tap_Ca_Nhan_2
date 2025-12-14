import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Kiểm tra user đã login chưa
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Loi khi doc thong tin user:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // TODO: Gọi API login thật
      // Giả lập login thành công
      const fakeUser = { id: 1, email, name: email.split('@')[0] };
      const fakeToken = 'fake-token-123';
      
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      setUser(fakeUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // TODO: Gọi API register thật
      const fakeUser = { id: 1, ...userData };
      const fakeToken = 'fake-token-123';
      
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      setUser(fakeUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
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
