import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { borrowAPI } from '../api';
import './BorrowLogsPage.css';

const BorrowLogsPage = ({ isAdmin, userId }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLogs();
    }, [isAdmin, userId]);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            let response;
            if (isAdmin) {
                response = await borrowAPI.getAll();
            } else {
                response = await borrowAPI.getByUserId(userId);
            }
            setLogs(response.data);
            setError(null);
        } catch (err) {
            setError('Gagal memuat log peminjaman');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Memuat log peminjaman...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>❌ {error}</p>
                <button onClick={fetchLogs}>Coba Lagi</button>
            </div>
        );
    }

    return (
        <div className="borrow-logs-page">
            <div className="page-header">
                <h1>{isAdmin ? 'Log Semua Peminjaman' : 'Pinjaman Saya'}</h1>
                <p>
                    {isAdmin
                        ? 'Riwayat peminjaman dari semua user'
                        : `Riwayat peminjaman untuk User ID: ${userId}`}
                </p>
            </div>

            {logs.length === 0 ? (
                <div className="empty-state">
                    <p>Belum ada riwayat peminjaman</p>
                    <Link to="/" className="btn btn-primary">Lihat Daftar Buku</Link>
                </div>
            ) : (
                <div className="logs-table-container">
                    <table className="logs-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Buku</th>
                                <th>Tanggal Pinjam</th>
                                <th>Lokasi (Lat, Lng)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td>{log.id}</td>
                                    <td>
                                        <span className="user-badge">User {log.userId}</span>
                                    </td>
                                    <td>
                                        <div className="book-cell">
                                            <strong>{log.book?.title || `Book #${log.bookId}`}</strong>
                                            {log.book?.author && <span>oleh {log.book.author}</span>}
                                        </div>
                                    </td>
                                    <td>{formatDate(log.borrowDate)}</td>
                                    <td>
                                        <span className="coordinates">
                                            📍 {log.latitude?.toFixed(4)}, {log.longitude?.toFixed(4)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BorrowLogsPage;
