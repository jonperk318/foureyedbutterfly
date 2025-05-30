import express from "express";
import { register, login, logout } from "../controllers/auth.js";
import { rateLimit } from "express-rate-limit";


const router = express.Router();

const registerLimiter = rateLimit({
  windowMs: 7 * 24 * 60 * 60 * 1000,
  limit: 1,
  message: "You really shouldn't be trying to register anyone :/",
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  message: "Too many login attempts, please try again later."
})

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);

export default router;
