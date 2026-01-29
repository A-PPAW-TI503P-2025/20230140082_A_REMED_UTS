import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper function to set role headers
export const setRoleHeaders = (role, userId = null) => {
    const headers = {};
    if (role === 'admin') {
        headers['x-user-role'] = 'admin';
    } else if (role === 'user') {
        headers['x-user-role'] = 'user';
        if (userId) {
            headers['x-user-id'] = userId.toString();
        }
    }
    return headers;
};

// Book API
export const bookAPI = {
    // Get all books (Public)
    getAll: async () => {
        const response = await api.get('/books');
        return response.data;
    },

    // Get book by ID (Public)
    getById: async (id) => {
        const response = await api.get(`/books/${id}`);
        return response.data;
    },

    // Create book (Admin only)
    create: async (bookData) => {
        const response = await api.post('/books', bookData, {
            headers: setRoleHeaders('admin'),
        });
        return response.data;
    },

    // Update book (Admin only)
    update: async (id, bookData) => {
        const response = await api.put(`/books/${id}`, bookData, {
            headers: setRoleHeaders('admin'),
        });
        return response.data;
    },

    // Delete book (Admin only)
    delete: async (id) => {
        const response = await api.delete(`/books/${id}`, {
            headers: setRoleHeaders('admin'),
        });
        return response.data;
    },
};

// Borrow API
export const borrowAPI = {
    // Borrow a book (User only)
    borrowBook: async (bookId, latitude, longitude, userId) => {
        const response = await api.post(
            '/borrow',
            { bookId, latitude, longitude },
            { headers: setRoleHeaders('user', userId) }
        );
        return response.data;
    },

    // Get all borrow logs (Admin only)
    getAll: async () => {
        const response = await api.get('/borrow', {
            headers: setRoleHeaders('admin'),
        });
        return response.data;
    },

    // Get borrow logs by user ID
    getByUserId: async (userId) => {
        const response = await api.get(`/borrow/user/${userId}`);
        return response.data;
    },
};

export default api;
