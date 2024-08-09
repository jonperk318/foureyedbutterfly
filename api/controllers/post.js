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
    res.json("from controller")
}

export const getPost = (req, res) => {

    const q = "SELECT * FROM users u JOIN posts p on u.id = p.uid WHERE p.id = ? ";
      //"SELECT id, title, img, date FROM posts WHERE id = ? ";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  };

export const updatePost = (req, res) => { // UPDATE
    res.json("from controller")
}

export const deletePost = (req, res) => { // DELETE

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("User not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid.");

        const postID = req.params.id;
        const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

        db.query(q, [postID, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can only delete your own posts");

            return res.json("Post has been deleted.");
        });
    });

}