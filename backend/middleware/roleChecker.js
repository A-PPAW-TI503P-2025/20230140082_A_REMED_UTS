// Middleware untuk mengecek role dari header x-user-role

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['x-user-role'];

        // Jika tidak ada role yang dibutuhkan (public endpoint)
        if (!allowedRoles || allowedRoles.length === 0) {
            return next();
        }

        // Cek apakah role ada di header
        if (!userRole) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak. Header x-user-role tidak ditemukan.'
            });
        }

        // Cek apakah role diizinkan
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: `Akses ditolak. Role '${userRole}' tidak memiliki izin untuk akses ini.`
            });
        }

        // Role valid, lanjut ke next middleware
        next();
    };
};

// Middleware khusus untuk admin
const isAdmin = (req, res, next) => {
    const userRole = req.headers['x-user-role'];

    if (userRole !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak. Hanya admin yang diizinkan.'
        });
    }

    next();
};

// Middleware khusus untuk user
const isUser = (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    const userId = req.headers['x-user-id'];

    if (userRole !== 'user') {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak. Hanya user yang diizinkan.'
        });
    }

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'Header x-user-id diperlukan untuk user.'
        });
    }

    // Simpan userId ke request untuk digunakan di controller
    req.userId = parseInt(userId);

    next();
};

module.exports = {
    checkRole,
    isAdmin,
    isUser
};
