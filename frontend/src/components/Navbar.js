import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ role, setRole, userId, setUserId }) => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">📚 Library System</Link>
            </div>

            <div className="navbar-menu">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                    Daftar Buku
                </Link>

                {role === 'admin' && (
                    <>
                        <Link to="/admin/add" className={location.pathname === '/admin/add' ? 'active' : ''}>
                            Tambah Buku
                        </Link>
                        <Link to="/admin/borrow-logs" className={location.pathname === '/admin/borrow-logs' ? 'active' : ''}>
                            Log Peminjaman
                        </Link>
                    </>
                )}

                {role === 'user' && (
                    <Link to="/my-borrows" className={location.pathname === '/my-borrows' ? 'active' : ''}>
                        Pinjaman Saya
                    </Link>
                )}
            </div>

            <div className="navbar-role">
                <div className="role-selector">
                    <label>Mode:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="guest">Guest</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

                {role === 'user' && (
                    <div className="user-id-input">
                        <label>User ID:</label>
                        <input
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
                            min="1"
                        />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
