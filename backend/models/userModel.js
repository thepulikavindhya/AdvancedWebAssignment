const db = require('../connection/DB');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


const registerUser = async (name, email, password) => {
  const connect = db.makePromise();
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (name, email, password) 
    VALUES (?, ?, ?)
  `;
  const [result] = await connect.execute(query, [name, email, hashedPassword]);
  return result.insertId;
};

const loginUser = async (email, password) => {
  const connect = db.makePromise();
  const query = `
    SELECT * 
    FROM users 
    WHERE email = ?
  `;
  const [rows] = await connect.execute(query, [email]);
  const user = rows[0];

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return { token, user: { id: user.id, name: user.name, email: user.email , isAdmin:user.isAdmin} };
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = { registerUser, loginUser, verifyToken };