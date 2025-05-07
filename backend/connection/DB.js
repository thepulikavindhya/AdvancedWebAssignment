const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Extract environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Create a connection pool
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});

// Function to connect to the database
const connectionWithDB = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error connecting to the database:", err.message);
        } else {
            console.log("__ DB CONNECTED __");
            connection.release(); // Release the connection back to the pool
        }
    });
};

const makePromise=()=>{
    return pool.promise();
}

module.exports = { connectionWithDB, makePromise };