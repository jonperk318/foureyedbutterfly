import express from "express";
import {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
  getPrevPost,
  getNextPost,
} from "../controllers/post.js";


const router = express.Router();

router.get("/", getPosts); // read all posts
router.post("/", addPost); // create new post
router.get("/prev/:pid", getPrevPost); // read previous post
router.get("/:pid", getPost); // read single post using ID
router.get("/next/:pid", getNextPost); // read previous post
router.put("/:pid", updatePost); // update
router.delete("/:pid", deletePost); // delete specific post

export default router;
