import express from "express";
import {
  upload,
  uploadFiles,
} from "../controllers/upload.js";


const router = express.Router();

router.post("/", upload.any("files"), uploadFiles);

export default router;
