import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookAPI } from '../api';
import './BookDetailPage.css';

const BookDetailPage = ({ role }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const response = await bookAPI.getById(id);
                setBook(response.data);
                setError(null);
            } catch (err) {
                setError('Gagal memuat detail buku');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleDelete = async () => {
        try {
            await bookAPI.delete(id);
            navigate('/');
        } catch (err) {
            alert('Gagal menghapus buku');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Memuat detail buku...</p>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="error-container">
                <p>❌ {error || 'Buku tidak ditemukan'}</p>
                <Link to="/" className="btn btn-back">Kembali ke Daftar</Link>
            </div>
        );
    }

    return (
        <div className="book-detail-page">
            <Link to="/" className="back-link">← Kembali ke Daftar</Link>

            <div className="book-detail-card">
                <div className="book-detail-cover">
                    <img src="/buku.png" alt={book.title} />
                </div>

                <div className="book-detail-content">
                    <h1>{book.title}</h1>
                    <p className="author">oleh <strong>{book.author}</strong></p>

                    <div className="book-meta">
                        <div className="meta-item">
                            <span className="meta-label">ID Buku</span>
                            <span className="meta-separator">:</span>
                            <span className="meta-value">{book.id}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Stok Tersedia</span>
                            <span className="meta-separator">:</span>
                            <span className={`meta-value stock ${book.stock > 0 ? 'available' : 'unavailable'}`}>
                                {book.stock} buku
                            </span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Status</span>
                            <span className="meta-separator">:</span>
                            <span className={`meta-value status ${book.stock > 0 ? 'available' : 'unavailable'}`}>
                                {book.stock > 0 ? 'Tersedia' : 'Tidak Tersedia'}
                            </span>
                        </div>
                    </div>

                    <div className="book-actions">
                        {role === 'user' && book.stock > 0 && (
                            <Link to={`/borrow/${book.id}`} className="btn btn-borrow">
                                Pinjam Buku Ini
                            </Link>
                        )}
                        {role === 'admin' && (
                            <>
                                <Link to={`/admin/edit/${book.id}`} className="btn btn-edit">
                                    Edit Buku
                                </Link>
                                <button className="btn btn-delete" onClick={() => setDeleteModal(true)}>
                                    Hapus Buku
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="modal-overlay" onClick={() => setDeleteModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon">⚠️</div>
                        <h2>Konfirmasi Hapus</h2>
                        <p>Yakin ingin menghapus buku <strong>"{book.title}"</strong>?</p>
                        <p className="modal-warning">Tindakan ini tidak dapat dibatalkan.</p>
                        <div className="modal-actions">
                            <button className="btn btn-cancel" onClick={() => setDeleteModal(false)}>
                                Batal
                            </button>
                            <button className="btn btn-confirm-delete" onClick={handleDelete}>
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetailPage;
