import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookAPI } from '../api';
import './AdminBookForm.css';

const AdminBookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        stock: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEdit) {
            fetchBook();
        }
    }, [id]);

    const fetchBook = async () => {
        try {
            setLoading(true);
            const response = await bookAPI.getById(id);
            const { title, author, stock } = response.data;
            setFormData({ title, author, stock });
        } catch (err) {
            setError('Gagal memuat data buku');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'stock' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi
        if (!formData.title.trim()) {
            setError('Title tidak boleh kosong');
            return;
        }
        if (!formData.author.trim()) {
            setError('Author tidak boleh kosong');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            if (isEdit) {
                await bookAPI.update(id, formData);
            } else {
                await bookAPI.create(formData);
            }

            navigate('/');
        } catch (err) {
            setError(`Gagal ${isEdit ? 'mengupdate' : 'menambahkan'} buku`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-form-page">
            <Link to="/" className="back-link">← Kembali ke Daftar</Link>

            <div className="form-card">
                <div className="form-header">
                    <h1>{isEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h1>
                    <p>{isEdit ? 'Ubah informasi buku' : 'Isi form untuk menambahkan buku baru'}</p>
                </div>

                {error && (
                    <div className="error-message">
                        ❌ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Judul Buku *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Masukkan judul buku"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Penulis *</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Masukkan nama penulis"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stok</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            placeholder="0"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-cancel" onClick={() => navigate('/')}>
                            Batal
                        </button>
                        <button type="submit" className="btn btn-submit" disabled={loading}>
                            {loading ? 'Menyimpan...' : (isEdit ? 'Update Buku' : 'Tambah Buku')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminBookForm;
