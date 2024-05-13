import express from "express";
import User from "../db/usersdb.js";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();

    if (!(email && password)) {
      return res.status(400).json({ msg: "All fields are compulsory" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    user.password = undefined;

    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ email }, process.env.jwtkey, { expiresIn: "2h" });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
