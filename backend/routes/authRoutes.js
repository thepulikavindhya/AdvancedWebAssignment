const express = require("express");
const authController = require('../controllers/authController.js');

const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Middleware to verify token (example protected route)
router.get('/protected', authController.verifyTokenMiddleware, (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.user });
});

module.exports = router;