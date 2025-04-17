import sqlite3 from "sqlite3";
import "dotenv/config";

const db = new sqlite3.Database(
    "foureyedbutterfly.db",
);

try {
    await execute(
        db,
        `CREATE TABLE users (
            uid INT PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
        );
        INSERT INTO users (uid, username, password)
            VALUES (
                1,
                ${process.env.USERNAME},
                ${process.env.PASSWORD},
            );`
    );
} catch (error) {
    console.log(error);
};

export default db;
