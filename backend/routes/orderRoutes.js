const express=require("express");
const orderController = require("../controllers/orderController.js");

// import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// router.use(auth);
router.post('/', orderController.checkout);
router.get('/history', orderController.history);

module.exports = router;