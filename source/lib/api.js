// source/lib/api.js

// Token của ứng dụng (App Token)
const APP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo';

// Đường dẫn gốc API
const BASE_URL = 'https://34.124.214.214:2423';

async function request(path, { method = 'GET', headers = {}, body, params } = {}) {
  
  // 1. Xử lý Query Params 
  let url = `${BASE_URL}${path}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, params[key]);
      }
    });
    // Nối tham số vào cuối URL
    url += `?${searchParams.toString()}`;
  }

  // 2. Lấy User Token từ LocalStorage (Token đăng nhập của người dùng)
  const userToken = localStorage.getItem('accessToken');

  // 3. Cấu hình Headers 
  const configHeaders = {
    'Content-Type': 'application/json',
    'x-app-token': APP_TOKEN,
    ...headers,
  };

  // Nếu user đã đăng nhập, gửi thêm User Token vào Authorization
  if (userToken) {
    configHeaders['Authorization'] = `Bearer ${userToken}`;
  }

  // 4. Gọi Fetch
  const res = await fetch(url, {
    method,
    headers: configHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    // Log lỗi ra console
    console.error(`API Error [${method} ${path}]:`, data?.message);
    throw new Error(data?.message || `HTTP ${res.status}`);
  }

  return data;
}

export const api = {
  // Truyền params xuống hàm request
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  del: (path) => request(path, { method: 'DELETE' }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  request: (path, options) => request(path, options),
};

export default api;