const { BorrowLog, Book } = require('../models');

// POST /api/borrow - Meminjam buku (User)
const borrowBook = async (req, res) => {
    try {
        const { bookId, latitude, longitude } = req.body;
        const userId = req.userId; // Dari middleware isUser

        // Validasi input
        if (!bookId) {
            return res.status(400).json({
                success: false,
                message: 'bookId diperlukan'
            });
        }

        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Latitude dan longitude diperlukan'
            });
        }

        // Cek apakah buku ada
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Buku tidak ditemukan'
            });
        }

        // Cek stok buku
        if (book.stock <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Stok buku habis'
            });
        }

        // Kurangi stok buku
        await book.update({
            stock: book.stock - 1
        });

        // Buat log peminjaman
        const borrowLog = await BorrowLog.create({
            userId,
            bookId,
            borrowDate: new Date(),
            latitude,
            longitude
        });

        res.status(201).json({
            success: true,
            message: 'Berhasil meminjam buku',
            data: {
                borrowLog,
                book: {
                    id: book.id,
                    title: book.title,
                    remainingStock: book.stock
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal meminjam buku',
            error: error.message
        });
    }
};

// GET /api/borrow - Mendapatkan semua log peminjaman (Admin)
const getAllBorrowLogs = async (req, res) => {
    try {
        const borrowLogs = await BorrowLog.findAll({
            include: [{
                model: Book,
                as: 'book',
                attributes: ['id', 'title', 'author']
            }],
            order: [['borrowDate', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Berhasil mendapatkan daftar peminjaman',
            data: borrowLogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan daftar peminjaman',
            error: error.message
        });
    }
};

// GET /api/borrow/user/:userId - Mendapatkan log peminjaman user tertentu
const getBorrowLogsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const borrowLogs = await BorrowLog.findAll({
            where: { userId },
            include: [{
                model: Book,
                as: 'book',
                attributes: ['id', 'title', 'author']
            }],
            order: [['borrowDate', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: `Berhasil mendapatkan daftar peminjaman untuk user ${userId}`,
            data: borrowLogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan daftar peminjaman',
            error: error.message
        });
    }
};

module.exports = {
    borrowBook,
    getAllBorrowLogs,
    getBorrowLogsByUser
};
