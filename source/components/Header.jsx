import { Link } from 'react-router-dom';
import { Moon, Sun, Settings } from 'lucide-react';

export default function Header({ isDarkMode, toggleTheme, user, onLogout }) {
  // TODO: Thay YOUR_MSSV bằng MSSV thật của bạn
  const MSSV = 'YOUR_MSSV';

  return (
    <header className="bg-pink-100 dark:bg-pink-900 py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - MSSV */}
        <div className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
          {MSSV}
        </div>

        {/* Center - App Name */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-600 transition-colors"
        >
          Movies Info
        </Link>

        {/* Right - Theme Toggle & User Info */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Settings Icon */}
          <Link
            to="/settings"
            className="p-2 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </Link>

          {/* User Info or Login Button */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
              >
                {user.name || user.email}
              </Link>
              <button
                onClick={onLogout}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
