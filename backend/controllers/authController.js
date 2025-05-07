// authController.js
const { registerUser, loginUser, verifyToken } = require('../models/userModel'); // Adjust path as needed
const bigPromise = require('../middlewares/bigPromise'); // Assuming you have a middleware for async handling


// Register function
exports.register = bigPromise(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userId = await registerUser(name, email, password);
        return res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error("Error in register controller:", error.message); // Log the error
        return res.status(500).json({ // Use a default status code
            success: false,
            error: error.message || 'Internal Server Error',
        });
    }
});

// Login function
exports.login = bigPromise(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const { token, user } = await loginUser(email, password);
        return res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        const statusCode = error.message === 'Invalid credentials' ? 401 : 500;
        return res.status(statusCode).json({
            success: false,
            error: error.message,
        });
    }
});


// Middleware to verify token
exports.verifyTokenMiddleware = bigPromise(async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});


