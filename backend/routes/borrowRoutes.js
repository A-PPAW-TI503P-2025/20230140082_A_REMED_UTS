const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { isUser, isAdmin } = require('../middleware/roleChecker');

// User route - Hanya user yang bisa meminjam
router.post('/', isUser, borrowController.borrowBook);

// Admin route - Melihat semua log peminjaman
router.get('/', isAdmin, borrowController.getAllBorrowLogs);

// Route untuk melihat peminjaman berdasarkan userId
router.get('/user/:userId', borrowController.getBorrowLogsByUser);

module.exports = router;
