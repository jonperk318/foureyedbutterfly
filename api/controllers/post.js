import {db} from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {

    const q = "SELECT * FROM posts";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => { // CREATE
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("User not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid.");

      const q = "INSERT INTO posts (`title`, `date`, `img`, `content`, `uid`) VALUES (?)";

      const values = [
        req.body.title,
        req.body.date,
        req.body.img,
        req.body.content,
        userInfo.id
      ]

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created");
      })
  });
};

export const getPost = (req, res) => {

    const q = "SELECT * FROM users u JOIN posts p on u.id = p.uid WHERE p.pid = ?";
  
    db.query(q, [req.params.pid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  };

export const updatePost = (req, res) => { // UPDATE
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("User not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid.");

      const postID = req.params.pid;
      const q = "UPDATE posts SET `title`=?, `img`=?, `content`=? WHERE `pid`=? AND `uid`=?";

      const values = [
        req.body.title,
        req.body.img,
        req.body.content
      ]

      db.query(q, [...values, postID, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated");
      })
  });
};

export const deletePost = (req, res) => { // DELETE

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("User not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid.");

        const postID = req.params.pid;
        const q = "DELETE FROM posts WHERE pid = ? AND uid = ?";

        db.query(q, [postID, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can only delete your own posts");
            return res.json("Post has been deleted.");
        });
    });

}