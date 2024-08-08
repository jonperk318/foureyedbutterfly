import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wow ur actually reading this lol',
    database: 'four-eyed-butterfly'
})