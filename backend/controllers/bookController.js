const bigPromise=require("../middlewares/bigPromise");
const customError=require("../utils/customError");
const { getAllBooks, getBookById ,createBook,updateBook,deleteBook  } = require('../models/bookModel'); // Adjust path as needed


//home
exports.home=bigPromise(async(req,res,next)=>{
    console.log("home");
    res.status(200).json({
        success:true,
        message:"Welcome to the home page"
    });
});

// //create book
exports.createBook = bigPromise(async (req, res, next) => {
    const { bookid, title,thumbnail, author, price, description } = req.body;

    // Validate required fields
    if (!bookid || !author || !title || !thumbnail||!price || !description) {
        return next(new customError("Please provide all the required fields", 400));
    }

    
    try {

        // Save the book to the database
        await createBook(req.body);

        // Send success response
        res.status(201).json({
            success: true,
            data: req.body
        });
    } catch (error) {
        // Handle errors
        return next(new customError(error.message || "Failed to create book", 500));
    }
});


// //get all books
exports.getAllBooks = bigPromise(async (req, res, next) => {
    const books = await getAllBooks();
    res.status(200).json({
        success: true,
        count: books.length,
        data: books
    });
});


// //get single book
exports.getSingleBook = bigPromise(async (req, res, next) => {
    const { id } = req.params;

    try {
        const book = await getBookById(id); // Explicitly load book by id
        if (!book) {
            return next(new customError(`Book with id ${id} not found`, 404));
        }

        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        return next(new customError(`Error loading book with id ${id}: ${error.message}`, 500));
    }
});





// // Update book

exports.updateBook = bigPromise(async (req, res, next) => {
    const { id } = req.params;

    // Validate required fields
    if (!id) {
        return next(new customError("Book ID is required to update the book", 400));
    }

    try {
        // Update the book in the database
         await updateBook(req.body);


        // Send success response
        res.status(200).json({
            success: true,
            data: "udpated the book with id " + id
        });
    } catch (error) {
        // Handle errors
        return next(new customError(error.message || "Failed to update book", 500));
    }
});
  


// //delete book

exports.deleteBook = bigPromise(async (req, res, next) => {
    const { id } = req.params;

    // Validate required fields
    if (!id) {
        return next(new customError("Book ID is required to delete the book", 400));
    }

    try {
        // Delete the book from the database
        await deleteBook(id);

        // Send success response
        res.status(200).json({
            success: true,
            data: "Deleted the book with id " + id
        });
    } catch (error) {
        // Handle errors
        return next(new customError(error.message || "Failed to delete book", 500));
    }
});

