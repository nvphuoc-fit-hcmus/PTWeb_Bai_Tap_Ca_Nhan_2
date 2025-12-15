import { Link } from 'react-router-dom';
import { Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; 
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const MSSV = '22120285';

  return (
    // Sửa màu dark:bg-[#451a1a] để ra màu đỏ tối như trong ảnh mẫu
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 px-4">
      <div className="container mx-auto h-16 flex items-center justify-between max-w-[1200px] bg-pink-100 dark:bg-[#451a1a] shadow-md rounded-xl px-4">
        
        {/* Góc trái - MSSV */}
        <div className="text-gray-700 dark:text-gray-200 font-medium text-sm">
          &lt;{MSSV}&gt;
        </div>

        {/* Giữa - Tên app */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold uppercase tracking-wide text-gray-800 dark:text-white">
          Movies Info
        </div>

        {/* Góc phải - Toggle dark mode */}
        <div className="flex items-center gap-3">
          
          {/* Nút Toggle Switch với icon bên ngoài */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none ${
                isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 shadow-md`}
              />
            </button>
            {/* Icon mặt trời/mặt trăng nằm bên ngoài bên phải */}
            {isDarkMode ? (
              <Moon size={18} className="text-gray-200" />
            ) : (
              <Sun size={18} className="text-yellow-500" />
            )}
          </div>

          {/* User Auth */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-1 px-2 py-1 rounded hover:bg-black/10 dark:hover:bg-white/10">
                <User className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                <span className="text-sm font-medium dark:text-white">@{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 font-medium transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 font-medium transition-colors"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}