import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../services/authService';

export default function ProfilePage() {
  const { user } = useAuth(); // Lấy thông tin user từ Context
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const { register, handleSubmit } = useForm({
    defaultValues: {
      phone: user?.phone || '',
      dob: user?.dob || '',
      email: user?.email || '', // Email thường không cho sửa, nhưng API có thể cho phép
    }
  });

  const onSubmit = async (data) => {
    setMessage('');
    try {
      // Gọi API updateProfile (PATCH)
      await authService.updateProfile(data);
      setMessage('Cập nhật thành công! Vui lòng đăng nhập lại để thấy thay đổi.');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setMessage('Cập nhật thất bại.');
    }
  };

  if (!user) return <div className="text-center py-20">Vui lòng đăng nhập...</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-[1200px]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-b pb-4">Hồ sơ cá nhân</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột trái: Avatar & Info cơ bản */}
        <div className="md:col-span-1 text-center">
          <div className="w-32 h-32 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-4xl text-white font-bold mb-4 shadow-lg">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">@{user.username}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.role || 'Member'}</p>
          
          <Link 
            to="/favourites" 
            className="mt-6 inline-block w-full py-2 px-4 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition font-medium"
          >
            ♥ Phim yêu thích
          </Link>
        </div>

        {/* Cột phải: Form thông tin */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Thông tin chi tiết</h3>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isEditing ? 'Hủy bỏ' : 'Chỉnh sửa'}
            </button>
          </div>

          {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">{message}</div>}

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
                <input {...register('email')} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Số điện thoại</label>
                <input {...register('phone')} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Ngày sinh</label>
                <input type="date" {...register('dob')} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Lưu thay đổi</button>
            </form>
          ) : (
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex border-b py-2 dark:border-gray-700">
                <span className="w-1/3 font-medium text-gray-500">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex border-b py-2 dark:border-gray-700">
                <span className="w-1/3 font-medium text-gray-500">Điện thoại:</span>
                <span>{user.phone || 'Chưa cập nhật'}</span>
              </div>
              <div className="flex border-b py-2 dark:border-gray-700">
                <span className="w-1/3 font-medium text-gray-500">Ngày sinh:</span>
                <span>{user.dob || 'Chưa cập nhật'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}