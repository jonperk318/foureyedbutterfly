import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: "./assets",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.any("files"), function (req, res) {
  const files = req.files;
  let fileNames = [];
  files.forEach((file) => {
    fileNames.push(file.filename);
  });
  const fileNamesString = fileNames.join(", ");
  res.status(200).json(fileNamesString);
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
});

app.use(generalLimiter);
//app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.API_PORT, () => {
  console.log("Connected");
});
