import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import db from "../db.js";


export const register = (req, res) => {
  // Check if user exists

  const q = "SELECT * FROM users WHERE username = ?";

  db.all(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");

    // Check admin password

    const q = "SELECT * FROM users WHERE username = ?";

    db.all(q, [process.env.USERNAME], (err, data) => {
      if (err) return res.status(500).json(err);

      if (!bcrypt.compareSync(req.body.admin_password, data[0].password))
        return res.status(400).json("Wrong admin password");

      // Hash the password and create a user

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const q = "INSERT INTO users (username, password) VALUES (?, ?)";

      db.run(q, [req.body.username, hash], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User created successfully");
      });
    });
  });
};

export const login = (req, res) => {
  // Check if user exists

  const q = "SELECT * FROM users WHERE username = ?";

  db.all(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    // Check password

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password,
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].uid }, process.env.JWT_SECRET);
    const { password, ...other } = data[0]; // separate password from other info

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("Come again soon!");
};
