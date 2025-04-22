import db from "../db.js";
import jwt from "jsonwebtoken";
import {unlink} from 'node:fs';

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

export const getPrevPost = (req, res) => {

  const q = "SELECT * FROM posts WHERE pid = (select max(pid) from posts where pid < ?)";

  db.query(q, [req.params.pid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  })
};

export const getPost = (req, res) => {

    const q = "SELECT * FROM posts WHERE pid = ?";

    db.query(q, [req.params.pid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  };

export const getNextPost = (req, res) => {

  const q = "SELECT * FROM posts WHERE pid = (select min(pid) from posts where pid > ?)";

  db.query(q, [req.params.pid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  })
};

export const updatePost = (req, res) => { // UPDATE
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("User not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid.");

      const postID = req.params.pid;

      if (req.body.img) {
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

        req.body.oldFiles.split(", ").map(oldFile => ( // Deleting old files
          unlink('../client/src/img/' + oldFile, (err) => {
            if (err) return res.status(500).json(err);
            console.log(oldFile + " deleted successfully");
          })
        ))

      } else {
        const q = "UPDATE posts SET `title`=?, `content`=? WHERE `pid`=? AND `uid`=?";

        const values = [
          req.body.title,
          req.body.content
        ]

        db.query(q, [...values, postID, userInfo.id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Post has been updated");
        })
      }
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

/*

export const deleteFiles = (req, res) => {

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("User not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid.");

      req.body.oldFiles.split(", ").map(oldFile => ( // Deleting old files
        unlink('../client/src/img/' + oldFile, (err) => {
          if (err) return res.status(500).json(err);
          console.log(oldFile + " deleted successfully");
        })
      ))
  });
};

*/
