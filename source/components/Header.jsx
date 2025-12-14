import { Link } from 'react-router-dom';
import { Moon, Sun, Settings } from 'lucide-react';

export default function Header({ isDarkMode, toggleTheme, user, onLogout }) {
  const MSSV = '22120285';

  return (
    <header className="bg-pink-100 dark:bg-pink-900 py-4 px-6 shadow-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Góc trái - MSSV */}
        <div className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
          {MSSV}
        </div>

        {/* Giữa - Tên app */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-600 transition-colors"
        >
          Movies Info
        </Link>

        {/* Góc phải - Toggle dark mode và Settings */}
        <div className="flex items-center gap-3">
          {/* Nút toggle dark mode */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
            aria-label="Chuyển chế độ sáng/tối"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Icon settings */}
          <Link
            to="/settings"
            className="p-2 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </Link>

          {/* Thông tin user hoặc nút login */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
              >
                {user.name || user.email}
              </Link>
              <button
                onClick={onLogout}
                className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
