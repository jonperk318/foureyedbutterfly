import mysql from 'mysql2';
import "dotenv/config";

export const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.DB_KEY,
    database: process.env.DB
})