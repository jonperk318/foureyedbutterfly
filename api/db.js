import sqlite3 from "sqlite3";
import "dotenv/config";

import { execute } from "./utils.js";


const db = new sqlite3.Database(process.env.DB);

try {

    const q1 = `CREATE TABLE IF NOT EXISTS users (
                uid INTEGER PRIMARY KEY,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                UNIQUE(username)
                );`

    await execute(db, q1);

    const q2 = `INSERT OR IGNORE INTO users (username, password)
                VALUES (?, ?);`

    await execute(db, q2, [process.env.USERNAME, process.env.PASSWORD]);

    const q3 = `CREATE TABLE IF NOT EXISTS posts (
                pid INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                date TEXT NOT NULL,
                img TEXT,
                content TEXT,
                uid INTEGER NOT NULL,
                FOREIGN KEY (uid) REFERENCES users(uid)
                );`

    await execute(db, q3);

} catch (err) {
    console.log(err);

} finally {
    db.close();
};


export default db;
