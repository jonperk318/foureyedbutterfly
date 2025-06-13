import db from "../db.js";
import jwt from "jsonwebtoken";
import { unlink } from "node:fs";


export const getFirstPost = (req, res) => {
  const q = "SELECT * FROM posts WHERE pid=1";

  db.all(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data[0]);
  });
};

export const getPosts = (req, res) => {
  const q = "SELECT * FROM posts";

  db.all(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  // CREATE

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("User not authenticated");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid.");

    const values = [
      req.body.title,
      req.body.date,
      req.body.content,
      userInfo.id,
      req.body.draft,
    ];

    const img = req.body.img;

    const q = `INSERT INTO posts (title, date, content, uid, draft${img && ", img"}) VALUES (?, ?, ?, ?, ?${img && ", ?"});`;

    img && values.push(img);

    db.run(q, values, (err) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created");
    });
  });
};

export const getPost = (req, res) => {
  // READ

  const token = req.cookies.access_token;
  const q = `SELECT * FROM posts WHERE
    pid=(SELECT MAX(pid) FROM posts WHERE pid<?${token ? "" : " AND draft=0"})
    OR pid=?
    OR pid=(SELECT MIN(pid) FROM posts WHERE pid>?${token ? "" : " AND draft=0"});`;

  db.all(q, Array(3).fill(req.params.pid), (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updatePost = (req, res) => {
  // UPDATE

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("User not authenticated");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid.");

    const values = [req.body.title, req.body.content, req.body.draft];

    const img = req.body.img;
    const q = `UPDATE posts SET title=?, content=?, draft=?${img ? ", img=?" : ""} WHERE pid=? AND uid=?`;
    img && values.push(img);

    db.run(q, [...values, req.params.pid, userInfo.id], (err) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated");
    });

    req.body.oldFiles?.split(", ").map(
      (
        oldFile, // Deleting old files
      ) =>
        unlink("./assets/" + oldFile, (err) => {
          if (err) return res.status(500).json(err);
          console.log(oldFile + " deleted successfully");
        }),
    );
  });
};

export const deletePost = (req, res) => {
  // DELETE

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("User not authenticated");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {

    if (err) return res.status(403).json("Token is not valid.");
    const q = "DELETE FROM posts WHERE pid = ? AND uid = ?";

    db.run(q, [req.params.pid, userInfo.id], (err) => {

      if (err) return res.status(403).json("You can only delete your own posts");

      req.body.oldFiles?.split(", ").map(oldFile => ( // Deleting old files
        unlink('./assets/' + oldFile, (err) => {
          if (err) console.log(err);
          console.log(oldFile + " deleted successfully");
        })
      ))

      return res.json("Post has been deleted.");
    });
  });
};
