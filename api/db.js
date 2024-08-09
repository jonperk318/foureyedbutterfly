import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'what are you looking at',
    database: 'four-eyed-butterfly'
})