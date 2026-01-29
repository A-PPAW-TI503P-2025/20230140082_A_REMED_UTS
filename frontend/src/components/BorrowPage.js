import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookAPI, borrowAPI } from '../api';
import './BorrowPage.css';

const BorrowPage = ({ userId }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [locationStatus, setLocationStatus] = useState('idle');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchBook();
        getLocation();
    }, [id]);

    const fetchBook = async () => {
        try {
            const response = await bookAPI.getById(id);
            setBook(response.data);
        } catch (err) {
            setError('Gagal memuat data buku');
            console.error(err);
        }
    };

    const getLocation = () => {
        setLocationStatus('loading');

        if (!navigator.geolocation) {
            setLocationStatus('error');
            setError('Browser tidak mendukung geolocation');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLocationStatus('success');
            },
            (err) => {
                console.error('Geolocation error:', err);
                setLocationStatus('error');
                setLocation({
                    latitude: -6.2088,
                    longitude: 106.8456,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const handleBorrow = async () => {
        if (!location.latitude || !location.longitude) {
            setError('Lokasi belum tersedia. Silakan izinkan akses lokasi.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await borrowAPI.borrowBook(
                parseInt(id),
                location.latitude,
                location.longitude,
                userId
            );

            setSuccess(true);
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Gagal meminjam buku');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="borrow-page">
                <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h1>Peminjaman Berhasil!</h1>
                    <p>Buku <strong>"{book?.title}"</strong> berhasil dipinjam.</p>
                    <div className="location-info">
                        <p>Lokasi peminjaman:</p>
                        <p className="coords">Lat: {location.latitude?.toFixed(6)}</p>
                        <p className="coords">Lng: {location.longitude?.toFixed(6)}</p>
                    </div>
                    <Link to="/" className="btn btn-primary">Kembali ke Daftar Buku</Link>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Memuat...</p>
            </div>
        );
    }

    return (
        <div className="borrow-page">
            <Link to="/" className="back-link">← Kembali ke Daftar</Link>

            <div className="borrow-card">
                <div className="borrow-header">
                    <h1>Pinjam Buku</h1>
                </div>

                <div className="book-preview">
                    <div className="book-preview-cover">
                        <img src="/buku.png" alt={book.title} />
                    </div>
                    <div className="book-preview-info">
                        <h2>{book.title}</h2>
                        <p>oleh {book.author}</p>
                        <span className={`stock-badge ${book.stock > 0 ? 'available' : 'unavailable'}`}>
                            Stok: {book.stock}
                        </span>
                    </div>
                </div>

                <div className="borrow-info">
                    <div className="info-item">
                        <span className="info-label">User ID</span>
                        <span className="info-value">{userId}</span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Status Lokasi</span>
                        <span className={`info-value location-status ${locationStatus}`}>
                            {locationStatus === 'loading' && 'Mengambil lokasi...'}
                            {locationStatus === 'success' && 'Lokasi ditemukan'}
                            {locationStatus === 'error' && 'Menggunakan lokasi default'}
                            {locationStatus === 'idle' && 'Menunggu...'}
                        </span>
                    </div>

                    {location.latitude && location.longitude && (
                        <div className="info-item">
                            <span className="info-label">Koordinat</span>
                            <span className="info-value coordinates">
                                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                            </span>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="error-message">{error}</div>
                )}

                <div className="borrow-actions">
                    <button
                        className="btn btn-borrow"
                        onClick={handleBorrow}
                        disabled={loading || book.stock <= 0}
                    >
                        {loading ? 'Memproses...' : 'Konfirmasi Peminjaman'}
                    </button>
                </div>

                {book.stock <= 0 && (
                    <p className="warning-text">Stok buku habis, tidak dapat meminjam</p>
                )}
            </div>
        </div>
    );
};

export default BorrowPage;
