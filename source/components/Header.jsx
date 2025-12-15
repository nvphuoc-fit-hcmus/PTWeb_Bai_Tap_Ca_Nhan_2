import { Link } from 'react-router-dom';
import { Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; 
// import { useAuth } from '../contexts/AuthContext'; // Nếu có AuthContext thì import

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme(); // Lấy trực tiếp từ Context
  // const { user, logout } = useAuth(); // Lấy user từ AuthContext (nếu có)
  
  // Tạm thời giả lập user để chỉnh UI (sau này thay bằng context thật)
  const user = null; 
  const MSSV = '22120285';

  return (
    // Sửa màu dark:bg-[#451a1a] để ra màu đỏ tối như trong ảnh mẫu
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-pink-100 dark:bg-[#451a1a] shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Góc trái - MSSV */}
        <div className="text-gray-700 dark:text-gray-200 font-medium text-sm">
          &lt;{MSSV}&gt;
        </div>

        {/* Giữa - Tên app */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold uppercase tracking-wide text-gray-800 dark:text-white">
          Movies Info
        </div>

        {/* Góc phải - Toggle dark mode và Settings */}
        <div className="flex items-center gap-3">
          
          {/* Nút Toggle Switch (Giống ảnh mẫu) */}
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
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 flex items-center justify-center`}
            >
               {/* Icon nhỏ bên trong nút tròn */}
               {isDarkMode ? (
                 <Moon size={10} className="text-black" />
               ) : (
                 <Sun size={10} className="text-yellow-500" />
               )}
            </span>
          </button>

          {/* Icon settings */}
          <button className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium dark:text-white">User</span>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 font-medium transition-colors"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}