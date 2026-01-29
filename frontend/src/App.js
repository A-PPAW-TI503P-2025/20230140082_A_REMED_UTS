import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookListPage from './components/BookListPage';
import BookDetailPage from './components/BookDetailPage';
import AdminBookForm from './components/AdminBookForm';
import BorrowPage from './components/BorrowPage';
import BorrowLogsPage from './components/BorrowLogsPage';
import './App.css';

function App() {
  const [role, setRole] = useState('guest');
  const [userId, setUserId] = useState(1);

  return (
    <Router>
      <div className="app">
        <Navbar
          role={role}
          setRole={setRole}
          userId={userId}
          setUserId={setUserId}
        />

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<BookListPage role={role} />} />
            <Route path="/books/:id" element={<BookDetailPage role={role} />} />

            {/* Admin Routes */}
            <Route path="/admin/add" element={<AdminBookForm />} />
            <Route path="/admin/edit/:id" element={<AdminBookForm />} />
            <Route
              path="/admin/borrow-logs"
              element={<BorrowLogsPage isAdmin={true} />}
            />

            {/* User Routes */}
            <Route path="/borrow/:id" element={<BorrowPage userId={userId} />} />
            <Route
              path="/my-borrows"
              element={<BorrowLogsPage isAdmin={false} userId={userId} />}
            />
          </Routes>
        </main>

        <footer className="footer">
          <p>Library System with Geolocation</p>
          <p>UCP 1 - Pengembangan Aplikasi Web</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
