const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");



// Define routes
router.route("/").get(getCart);
router.route("/addCart").post(addToCart);
router.route("/removeItem/:id").delete(removeFromCart);

module.exports = router;