import express from 'express';
import {getPosts, addPost, getPost, updatePost, deletePost} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts); // read all posts
router.post("/", addPost); // create new post
router.get("/:id", getPost); // read single post using ID
router.put("/:id", updatePost); // update
router.delete("/:id", deletePost); // delete specific post

export default router;