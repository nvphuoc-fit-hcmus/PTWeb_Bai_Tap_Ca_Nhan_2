import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import FavouritesPage from './pages/FavouritesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import PersonDetailPage from './pages/PersonDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="movie/:id" element={<MovieDetailPage />} />
              <Route path="person/:id" element={<PersonDetailPage />} />
              
              {/* Các route cần đăng nhập mới vào được */}
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="favourites"
                element={
                  <ProtectedRoute>
                    <FavouritesPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;