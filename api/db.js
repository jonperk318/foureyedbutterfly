import mysql from 'mysql2';
import "dotenv/config";

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_KEY,
    database: 'four-eyed-butterfly'
})