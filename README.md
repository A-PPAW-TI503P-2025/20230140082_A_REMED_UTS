# 📚 Library System with Geolocation

## Identitas Mahasiswa
- **Nama**: [Nama Lengkap Anda]
- **NIM**: 20230140082
- **Kelas**: A
- **Mata Kuliah**: Pengembangan Aplikasi Web (PAW)
- **Jenis Ujian**: Remedial UTS

---

## 📋 Deskripsi Proyek

Aplikasi **Library System with Geolocation** adalah sistem perpustakaan digital yang memungkinkan pengguna untuk:
- Melihat daftar buku yang tersedia
- Melihat detail buku
- Meminjam buku dengan pencatatan lokasi (geolocation)
- Admin dapat mengelola data buku (CRUD)
- Melihat log peminjaman dengan informasi lokasi

### Teknologi yang Digunakan
| Layer | Teknologi |
|-------|-----------|
| Frontend | React.js, React Router DOM, Axios |
| Backend | Express.js, Sequelize ORM |
| Database | MySQL |
| Styling | CSS Custom (Poppins Font) |

---

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat
- Node.js
- MySQL Server
- NPM

### 1. Clone/Extract Repository
```bash
cd 20230140082_A_REMED_UTS
```

### 2. Setup Database
Buat database MySQL dengan nama `library_system`:
```sql
CREATE DATABASE library_system;
```

### 3. Konfigurasi Environment
Edit file `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=library_system
DB_PORT=3306
PORT=3000
```

### 4. Install Dependencies & Migrasi Database
```bash
cd backend
npm install
npx sequelize-cli db:migrate
```

### 5. Jalankan Backend
```bash
npm run dev
```
Backend berjalan di: `http://localhost:3000`

### 5. Jalankan Frontend
Buka terminal baru:
```bash
cd frontend
npm install
npm start
```
Frontend berjalan di: `http://localhost:5000`

---

## 🎮 Fitur & Penggunaan

### Mode Guest
- Melihat daftar buku
- Melihat detail buku

![Dashboard Guest](screenshots/dashboardguest.jpeg)
![Detail Buku Guest](screenshots/detailbukuguest.jpeg)

### Mode User
- Semua fitur Guest
- Meminjam buku (dengan autolokasi dari browser)
- Melihat riwayat peminjaman sendiri

![Dashboard User](screenshots/dashboarduser.jpeg)
![Detail Buku User](screenshots/detailbukuuser.jpeg)
![Pinjam Buku](screenshots/pinjambukuuser.jpeg)
![Berhasil Pinjam](screenshots/berhasilpinjambukuuser.jpeg)
![Riwayat Pinjaman](screenshots/bukupinjamanuser.jpeg)

### Mode Admin
- Semua fitur Guest
- Menambah buku baru
- Mengedit informasi buku
- Menghapus buku (dengan konfirmasi popup)
- Melihat log semua peminjaman

![Dashboard Admin](screenshots/dashboardadmin.jpeg)
![Detail Buku Admin](screenshots/detailbukuadmin.jpeg)
![Tambah Buku](screenshots/tambahbukuadmin.jpeg)
![Edit Buku](screenshots/editbukuadmin.jpeg)
![Hapus Buku](screenshots/hapusbukuadmin.jpeg)
![Log Peminjaman](screenshots/logpeminjamanadmin.jpeg)

---

## 📁 Struktur Folder

```
20230140082_A_REMED_UTS/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── .env
├── frontend/
│   ├── public/
│   │   └── buku.png
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## 🌐 API Endpoints

### 1️⃣ Public Endpoints (Tanpa Header)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | / | Welcome message + list endpoints |
| GET | /api/books | Lihat semua buku |
| GET | /api/books/:id | Detail buku berdasarkan ID |

![GET Welcome](screenshots/utspaw_getpublic.png)
![GET All Books](screenshots/utspaw_getbukupublic.png)
![GET Book by ID](screenshots/utspaw_detailbukupublic.png)

### 2️⃣ Admin Endpoints (Header: `x-user-role: admin`)
| Method | Endpoint | Body | Deskripsi |
|--------|----------|------|-----------|
| POST | /api/books | `{"title": "...", "author": "...", "stock": 10}` | Tambah buku baru |
| PUT | /api/books/:id | `{"stock": 10}` | Update buku |
| DELETE | /api/books/:id | - | Hapus buku |
| GET | /api/borrow | - | Lihat semua log peminjaman |

![POST Tambah Buku](screenshots/utspaw_tambahbuku.png)
![PUT Edit Buku](screenshots/utspaw_editbuku.png)
![DELETE Hapus Buku](screenshots/utspaw_deletebuku.png)
![GET Log Peminjaman](screenshots/utspaw_logpeminjaman.png)

### 3️⃣ User Endpoints (Header: `x-user-role: user` + `x-user-id: 1`)
| Method | Endpoint | Body | Deskripsi |
|--------|----------|------|-----------|
| POST | /api/borrow | `{"bookId": 1, "latitude": -6.2088, "longitude": 106.8456}` | Pinjam buku |

![POST Pinjam Buku](screenshots/utspaw_pinjambuku.png)

---

## 🎨 Color Palette

| Warna | Kode Hex | Penggunaan |
|-------|----------|------------|
| Navy | #2A4158 | Navbar, Footer |
| Teal | #5B9C9C | Buttons, Accent |
| Beige | #F1E7D8 | Background |
| Sky Blue | #6C9DB8 | Secondary |
| Light Blue | #bfe5ef | Book Cover BG |

---

## 📝 Catatan

- Pastikan MySQL server sudah berjalan sebelum menjalankan backend
- Browser akan meminta izin akses lokasi saat meminjam buku
- Jika lokasi tidak tersedia, akan menggunakan lokasi default (Jakarta)

---

© 2024 - Praktikum Pengembangan Aplikasi Web