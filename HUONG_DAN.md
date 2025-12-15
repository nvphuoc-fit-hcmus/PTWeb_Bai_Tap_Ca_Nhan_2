# 🎬 HƯỚNG DẪN HOÀN THIỆN BÀI TẬP - MOVIES INFO APP

**MSSV:** 22120285

## ✅ ĐÃ HOÀN THÀNH (10 commits)

1. ✅ Cấu hình Tailwind CSS và utils
2. ✅ Tạo Header component (MSSV, tên app, dark mode toggle)
3. ✅ Tạo Navigation component (Home icon, Search bar)
4. ✅ Tạo Footer component
5. ✅ Tạo ThemeContext (Dark mode)
6. ✅ Cấu hình API client
7. ✅ Tạo AuthContext
8. ✅ Tạo MainLayout
9. ✅ Tạo HomePage cơ bản
10. ✅ Setup React Router

## 📝 CẦN LÀM TIẾP

### QUAN TRỌNG - ĐỔI TOKEN!

**File:** `source/lib/api.js`
```javascript
export const APP_TOKEN = 'YOUR_TOKEN'; // <-- ĐỔI THÀNH TOKEN TỪ EMAIL!
```

### BƯỚC TIẾP THEO

#### 1. Tạo trang Login (2 commits)
- File: `source/pages/LoginPage.jsx`
- Form với email + password
- Validation bằng react-hook-form + zod
- Commit 1: "tao form login co ban"
- Commit 2: "them validation cho form login"

#### 2. Tạo trang Register (2 commits)
- File: `source/pages/RegisterPage.jsx`
- Form đăng ký
- Validation đầy đủ
- Commit 1: "tao form dang ky"
- Commit 2: "them validation va xu ly submit"

#### 3. Kết nối API thật (2+ commits)
- File: `source/services/api.js` - Tạo các functions gọi API
- Test với API thật
- Commit mỗi khi tạo xong 1 service (movies, auth, favorites...)

#### 4. Cập nhật HomePage với data thật (2+ commits)
- Gọi API lấy top revenue movies
- Gọi API lấy popular movies
- Gọi API lấy top rated movies
- Commit 1: "ket noi API lay danh sach phim"
- Commit 2: "hien thi du lieu that len trang chu"

#### 5. Tạo MovieDetailPage (2+ commits)
- Hiển thị đầy đủ thông tin phim
- Cast clickable (link đến PersonDetailPage)
- Reviews với pagination
- Nút Add to Favorites
- Commit sau mỗi phần nhỏ

#### 6. Tạo SearchPage (2+ commits)
- Search by title
- Search by person
- Pagination
- Commit 1: "tao trang search co ban"
- Commit 2: "them chuc nang pagination"

#### 7. Tạo PersonDetailPage (2 commits)
- Thông tin diễn viên/đạo diễn
- Danh sách phim tham gia
- Commit 1: "hien thi thong tin person"
- Commit 2: "them danh sach phim cua person"

#### 8. Tạo ProfilePage (2 commits)
- Hiển thị thông tin user
- Form chỉnh sửa profile
- Commit 1: "tao trang profile"
- Commit 2: "them chuc nang cap nhat thong tin"

#### 9. Tạo FavouritesPage (2 commits)
- Hiển thị danh sách yêu thích
- Xóa khỏi danh sách
- Commit 1: "hien thi danh sach phim yeu thich"
- Commit 2: "them chuc nang xoa khoi favourites"

#### 10. Protected Routes (1 commit)
- File: `source/components/ProtectedRoute.jsx`
- Bảo vệ Profile và Favourites
- Commit: "them protected route cho cac trang can login"

#### 11. Thêm hover effects (1 commit)
- Movie cards hiển thị info khi hover
- Commit: "them hieu ung hover cho movie cards"

#### 12. Thêm Loading states (1 commit)
- Loading spinner khi fetch data
- Commit: "them loading state khi goi API"

#### 13. Tạo reusable components (2+ commits)
- MovieCard component
- Pagination component
- Commit mỗi component

## 🎯 QUY TẮC COMMIT

### ✅ Tốt:
```
"them thanh navigation voi icon home"
"tao form login co validation"
"ket noi API lay danh sach phim"
"fix loi hien thi poster"
```

### ❌ Tránh:
```
"update" (quá chung chung)
"feat: implement advanced authentication system with JWT tokens" (quá AI)
"done" (không rõ làm gì)
```

## 📊 TỰ ĐÁNH GIÁ ĐIỂM

Sau khi hoàn thành, tạo file `diem.txt`:

```
MSSV: 22120285
Ho ten: [TEN CUA BAN]

DANH GIA:
1. Giao dien co ban: 0.5
2. Dark mode: 0.5
3. Hero section (5 phim): 0.5
4. Most Popular: 0.5
5. Hover effect: 0.5
6. Top Rating: 0.5
7. Link chi tiet phim: 0.5
8. Search theo ten: 0.5
9. Search theo person: 0.5
10. Chi tiet phim: 1.0
11. Chi tiet person: 1.0
12. Reviews: 0.5
13. Home + Loading: 0.5
14. Phan trang: 1.0
15. Auth (register/login/logout): 0.5
16. Form validation: 0.5
17. Kiem soat authentication: 0.5
18. Them favourites: 0.5
19. Quan ly favourites: 0.5

TONG: [TINH TONG]

GHI CHU:
- Cac chuc nang da lam duoc 100%
- Chua lam: [liet ke neu co]
```

## 🚀 NỘP BÀI

### 1. Tạo gitlog.txt
```bash
cd "d:\Phuoc\Nam_4\Phat_trien_web_co_ban\Bai_Tap_Ca_Nhan\baitapcanhan_2\PTWeb_Bai_Tap_Ca_Nhan_2"
git log --pretty=format:"%h - %an, %ar : %s" > gitlog.txt
```

### 2. Xóa node_modules
```bash
cd source
rmdir /s /q node_modules
```

### 3. Cấu trúc nộp bài
```
22120285_XXXX/
  ├── diem.txt
  ├── gitlog.txt
  └── source/
      ├── components/
      ├── contexts/
      ├── pages/
      ├── ... (tất cả trừ node_modules và .git)
```

### 4. Nén file
- Tên: `22120285_XXXX.zip` (XXXX là điểm, VD: 0900 = 9 điểm)

### 5. Submit form
- https://forms.gle/mgKZdN8PC3YLnqze6

## 💡 TIPS QUAN TRỌNG

1. **Commit thường xuyên**: Làm xong 1 phần nhỏ là commit ngay
2. **Test trước khi commit**: Chạy `npm start` kiểm tra không lỗi
3. **API endpoints**: Đọc kỹ docs tại https://34.124.214.214:2423/api-docs/
4. **Ưu tiên chức năng**: Làm cho chạy được trước, CSS đẹp sau
5. **Pagination**: Tất cả danh sách phải có pagination
6. **Error handling**: Luôn có try-catch khi gọi API

## 📞 KHI GẶP LỖI

### Lỗi CORS:
- Kiểm tra API token đúng chưa
- Xem có cần config thêm trong axios không

### Lỗi component không hiện:
- Check console.log xem có lỗi import không
- Kiểm tra routing setup đúng chưa

### Lỗi dark mode không hoạt động:
- Kiểm tra ThemeProvider bọc đúng chưa
- Xem CSS có class .dark chưa

Chúc bạn làm bài tốt! 🎉
