import express from "express";
import {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.js";


const router = express.Router();

router.get("/", getPosts); // read all posts
router.post("/", addPost); // create new post
router.get("/:pid", getPost); // read single post using ID
router.put("/:pid", updatePost); // update
router.delete("/:pid", deletePost); // delete specific post

export default router;
