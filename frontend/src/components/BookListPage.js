import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookAPI } from '../api';
import './BookListPage.css';

const BookListPage = ({ role }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, book: null });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await bookAPI.getAll();
            setBooks(response.data);
            setError(null);
        } catch (err) {
            setError('Gagal memuat daftar buku');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (book) => {
        setDeleteModal({ show: true, book });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ show: false, book: null });
    };

    const handleDelete = async () => {
        if (!deleteModal.book) return;

        try {
            await bookAPI.delete(deleteModal.book.id);
            closeDeleteModal();
            fetchBooks();
        } catch (err) {
            alert('Gagal menghapus buku');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Memuat daftar buku...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>❌ {error}</p>
                <button onClick={fetchBooks}>Coba Lagi</button>
            </div>
        );
    }

    return (
        <div className="book-list-page">
            <div className="page-header">
                <h1>Daftar Buku</h1>
                <p>Temukan buku favoritmu di perpustakaan kami</p>
            </div>

            {books.length === 0 ? (
                <div className="empty-state">
                    <p>Belum ada buku tersedia</p>
                </div>
            ) : (
                <div className="book-grid">
                    {books.map((book) => (
                        <div key={book.id} className="book-card">
                            <div className="book-cover">
                                <img src="/buku.png" alt={book.title} />
                            </div>
                            <div className="book-info">
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-author">{book.author}</p>
                            </div>
                            <div className="book-actions">
                                <div className="actions-row">
                                    <Link to={`/books/${book.id}`} className="btn btn-detail">
                                        Detail
                                    </Link>
                                    <span className={`book-stock ${book.stock > 0 ? 'available' : 'unavailable'}`}>
                                        Stok: {book.stock}
                                    </span>
                                </div>
                                {role === 'user' && book.stock > 0 && (
                                    <div className="actions-row user-actions">
                                        <Link to={`/borrow/${book.id}`} className="btn btn-borrow">
                                            Pinjam
                                        </Link>
                                    </div>
                                )}
                                {role === 'admin' && (
                                    <div className="actions-row admin-actions">
                                        <Link to={`/admin/edit/${book.id}`} className="btn btn-edit">
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-delete"
                                            onClick={() => openDeleteModal(book)}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="modal-overlay" onClick={closeDeleteModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon">⚠️</div>
                        <h2>Konfirmasi Hapus</h2>
                        <p>Yakin ingin menghapus buku <strong>"{deleteModal.book?.title}"</strong>?</p>
                        <p className="modal-warning">Tindakan ini tidak dapat dibatalkan.</p>
                        <div className="modal-actions">
                            <button className="btn btn-cancel" onClick={closeDeleteModal}>
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

export default BookListPage;
