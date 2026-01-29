const { Book } = require('../models');

// GET /api/books - Mendapatkan semua buku (Public)
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Berhasil mendapatkan daftar buku',
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan daftar buku',
            error: error.message
        });
    }
};

// GET /api/books/:id - Detail buku (Public)
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Buku tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mendapatkan detail buku',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan detail buku',
            error: error.message
        });
    }
};

// POST /api/books - Tambah buku baru (Admin)
const createBook = async (req, res) => {
    try {
        const { title, author, stock } = req.body;

        // Validasi input
        if (!title || !author) {
            return res.status(400).json({
                success: false,
                message: 'Title dan author tidak boleh kosong'
            });
        }

        const book = await Book.create({
            title,
            author,
            stock: stock || 0
        });

        res.status(201).json({
            success: true,
            message: 'Berhasil menambahkan buku',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan buku',
            error: error.message
        });
    }
};

// PUT /api/books/:id - Update buku (Admin)
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, stock } = req.body;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Buku tidak ditemukan'
            });
        }

        // Validasi input
        if (title !== undefined && title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Title tidak boleh kosong'
            });
        }

        if (author !== undefined && author.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Author tidak boleh kosong'
            });
        }

        await book.update({
            title: title || book.title,
            author: author || book.author,
            stock: stock !== undefined ? stock : book.stock
        });

        res.status(200).json({
            success: true,
            message: 'Berhasil mengupdate buku',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengupdate buku',
            error: error.message
        });
    }
};

// DELETE /api/books/:id - Hapus buku (Admin)
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Buku tidak ditemukan'
            });
        }

        await book.destroy();

        res.status(200).json({
            success: true,
            message: 'Berhasil menghapus buku',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus buku',
            error: error.message
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
