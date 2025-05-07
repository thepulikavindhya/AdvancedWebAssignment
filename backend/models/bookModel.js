
const db = require('../connection/DB');

const getAllBooks = async () => {
  const connect=db.makePromise();
  const [rows] = await connect.execute('SELECT * FROM books');
  return rows;
};

const getBookById = async (id) => {
  const connect=db.makePromise();
  const [rows] = await connect.execute('SELECT * FROM books WHERE bookid = ?', [id]);
  return rows[0];
};

const createBook = async (book) => {
  const connect = db.makePromise();
  const query = `
    INSERT INTO books (bookid, title, author,thumbnail, price, description) 
    VALUES (?, ?, ?,?, ?, ?)
  `;
  // Print the book data to the terminal
  const values = [book.bookid, book.title, book.author,book.thumbnail, book.price, book.description];
  await connect.execute(query, values);
};

const updateBook = async (book) => {
  const connect = db.makePromise();
  const query = `
    UPDATE books 
    SET title = ?, author = ?, price = ?, description = ? 
    WHERE id = ?
  `;
  // Print the updated book data to the terminal
  const values = [book.title, book.author, book.price, book.description, book.id];
  await connect.execute(query, values);
};


const deleteBook = async (bookId) => {
  const connect = db.makePromise();
  const query = `
    DELETE FROM books 
    WHERE id = ?
  `;
  // Execute the query with the book ID
  await connect.execute(query, [bookId]);
};


module.exports = { getAllBooks, getBookById, createBook,updateBook,deleteBook };
