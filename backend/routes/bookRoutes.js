const express = require("express");
const router = express.Router();

const {
  home,
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// Define routes
router.route("/").get(home);
router.route("/create").post(createBook);
router.route("/allbooks").get(getAllBooks);
router.route("/book/:id").get(getSingleBook);
router.route("/update/:id").put(updateBook);
router.route("/delete/:id").delete(deleteBook);

module.exports = router;