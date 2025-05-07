const db = require('../connection/DB');

const createOrder = async (userId, items) => {
  const connect = db.makePromise();
  const [orderResult] = await connect.execute('INSERT INTO orders (user_id) VALUES (?)', [userId]);
  const orderId = orderResult.insertId;

  for (const item of items) {
    const query = `
      INSERT INTO order_items (order_id, book_id, quantity) 
      VALUES (?, ?, ?)
    `;
    await connect.execute(query, [orderId, item.book_id, item.quantity]);
  }

  return orderId;
};

const getOrdersByUser = async (userId) => {
  const connect = db.makePromise();
  const query = `
    SELECT o.id, o.created_at, b.title, i.quantity 
    FROM orders o 
    JOIN order_items i ON o.id = i.order_id 
    JOIN books b ON i.book_id = b.id 
    WHERE o.user_id = ?
  `;
  const [rows] = await connect.execute(query, [userId]);
  return rows;
};

module.exports = { createOrder, getOrdersByUser };