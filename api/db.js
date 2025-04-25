import sqlite3 from "sqlite3";
import "dotenv/config";
import bcrypt from "bcryptjs";


const db = new sqlite3.Database(process.env.DB);

db.serialize(function() {

    db.exec(`CREATE TABLE IF NOT EXISTS users (
                uid INTEGER PRIMARY KEY,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                UNIQUE(username)
                );`
    );

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(process.env.PASSWORD, salt);

    db.run(`INSERT OR IGNORE INTO users
                (username, password)
                VALUES (?, ?);`,
        [process.env.USERNAME, hash]
    );

    db.exec(`CREATE TABLE IF NOT EXISTS posts (
                pid INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                date TEXT NOT NULL,
                content TEXT,
                uid INTEGER NOT NULL,
                img TEXT,
                FOREIGN KEY (uid) REFERENCES users (uid)
                );`
    );
});


export default db;
