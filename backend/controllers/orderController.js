const bigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");
const orderModel = require("../models/orderModel");

// Checkout
exports.checkout = bigPromise(async (req, res, next) => {
    const { items } = req.body;

    // Validate required fields
    if (!items || items.length === 0) {
        return next(new customError("Items are required for checkout", 400));
    }

    try {
        // Create order
        const orderId = await orderModel.createOrder(req.user.id, items);

        // Send success response
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderId
        });
    } catch (error) {
        return next(new customError(error.message || "Failed to place order", 500));
    }
});

// Order history
exports.history = bigPromise(async (req, res, next) => {
    try {
        // Retrieve order history
        const orders = await orderModel.getOrdersByUser(req.user.id);

        // Send success response
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        return next(new customError(error.message || "Failed to retrieve order history", 500));
    }
});