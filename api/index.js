import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import uploadRoutes from "./routes/upload.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";

const API_PORT = process.env.API_PORT
const CLIENT_URL = process.env.CLIENT_URL


const app = express();

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
});

app.use(generalLimiter);
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(API_PORT, () => {
  console.log("Connected on port " + API_PORT);
});
