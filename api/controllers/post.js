import {db} from "../db.js";

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

    const q = "SELECT * FROM posts WHERE id = ? ";
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
    res.json("from controller")
}