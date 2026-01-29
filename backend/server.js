require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Library System API',
        version: '1.0.0',
        endpoints: {
            public: {
                'GET /api/books': 'Melihat semua buku',
                'GET /api/books/:id': 'Detail buku'
            },
            admin: {
                'POST /api/books': 'Tambah buku baru (Header: x-user-role: admin)',
                'PUT /api/books/:id': 'Update buku (Header: x-user-role: admin)',
                'DELETE /api/books/:id': 'Hapus buku (Header: x-user-role: admin)',
                'GET /api/borrow': 'Melihat semua log peminjaman (Header: x-user-role: admin)'
            },
            user: {
                'POST /api/borrow': 'Meminjam buku (Header: x-user-role: user, x-user-id: [id])'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Start server
const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');

        // Start listening
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📚 Library System API v1.0.0`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
        process.exit(1);
    }
};

startServer();
