const express = require('express');
const router = express.Router();

const bookRoutes = require('./bookRoutes');
const borrowRoutes = require('./borrowRoutes');

// Mount routes
router.use('/books', bookRoutes);
router.use('/borrow', borrowRoutes);

module.exports = router;
