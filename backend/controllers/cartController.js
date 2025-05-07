const bigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");
const cartModel = require("../models/cartModel");

// Add to cart
exports.addToCart = bigPromise(async (req, res, next) => {
    const { bookId, quantity } = req.body;

    // Validate required fields
    if (!bookId || !quantity) {
        return next(new customError("Book ID and quantity are required", 400));
    }

    try {
        // Add item to cart
        await cartModel.addToCart(req.user.id, bookId, quantity);

        // Send success response
        res.status(201).json({
            success: true,
            message: "Added to cart"
        });
    } catch (error) {
        return next(new customError(error.message || "Failed to add to cart", 500));
    }
});

// Get cart items
exports.getCart = bigPromise(async (req, res, next) => {
    try {
        // Retrieve cart items
        const items = await cartModel.getCart(req.user.id);

        // Send success response
        res.status(200).json({
            success: true,
            data: items
        });
    } catch (error) {
        return next(new customError(error.message || "Failed to retrieve cart", 500));
    }
});

// Remove from cart
exports.removeFromCart = bigPromise(async (req, res, next) => {
    const { id } = req.params;

    // Validate required fields
    if (!id) {
        return next(new customError("Cart item ID is required", 400));
    }

    try {
        // Remove item from cart
        await cartModel.removeFromCart(id);

        // Send success response
        res.status(200).json({
            success: true,
            message: "Removed from cart"
        });
    } catch (error) {
        return next(new customError(error.message || "Failed to remove from cart", 500));
    }
});