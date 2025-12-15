import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';

// Schema validation đầy đủ theo API
const schema = z.object({
  username: z.string().min(3, 'Username phải tối thiểu 3 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').regex(/^[0-9]+$/, 'Chỉ được nhập số'),
  dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: 'Ngày sinh không hợp lệ' }),
  password: z.string().min(6, 'Password tối thiểu 6 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password không khớp',
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser, isAuthenticated } = useAuth();

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      // Gọi hàm register với đầy đủ tham số
      const res = await registerUser(data.username, data.email, data.password, data.phone, data.dob);
      if (res.success) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError('Lỗi hệ thống, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Đăng ký tài khoản</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Username</label>
            <input type="text" {...register('username')} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ví dụ: nguyenvana" />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" {...register('email')} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="email@example.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Số điện thoại</label>
              <input type="text" {...register('phone')} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="09xxxx" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Ngày sinh</label>
              <input type="date" {...register('dob')} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" {...register('password')} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Xác nhận Password</label>
            <input type="password" {...register('confirmPassword')} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="w-full py-2.5 bg-green-600 text-white font-semibold rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors mt-2">
            {loading ? 'Đang xử lý...' : 'Đăng ký tài khoản'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Đã có tài khoản? <Link to="/login" className="text-blue-500 hover:underline font-medium">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}