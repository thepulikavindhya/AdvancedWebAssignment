const db = require('../connection/DB');

const addToCart = async (userId, bookId, quantity) => {
  const connect = db.makePromise();
  const query = `
    INSERT INTO cart (user_id, book_id, quantity) 
    VALUES (?, ?, ?) 
    ON DUPLICATE KEY UPDATE quantity = quantity + ?
  `;
  const values = [userId, bookId, quantity, quantity];
  await connect.execute(query, values);
};

const getCart = async (userId) => {
  const connect = db.makePromise();
  const query = `
    SELECT c.id, b.title, b.price, c.quantity 
    FROM cart c 
    JOIN books b ON c.book_id = b.id 
    WHERE c.user_id = ?
  `;
  const [rows] = await connect.execute(query, [userId]);
  return rows;
};

const removeFromCart = async (cartId) => {
  const connect = db.makePromise();
  const query = `
    DELETE FROM cart 
    WHERE id = ?
  `;
  await connect.execute(query, [cartId]);
};

module.exports = { addToCart, getCart, removeFromCart };