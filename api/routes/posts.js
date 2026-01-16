import express from "express";
import {
  getFirstPost,
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.js";


const router = express.Router();

router.get("/first/", getFirstPost); // read first post
router.get("/all/:year/", getPosts); // read all posts from a specific year
router.post("/", addPost); // create new post
router.get("/:pid/", getPost); // read single post using ID
router.put("/:pid/", updatePost); // update
router.delete("/:pid/", deletePost); // delete specific post

export default router;
