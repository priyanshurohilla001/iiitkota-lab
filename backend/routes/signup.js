import express from "express";
import User from "../db/usersdb.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, password, section } = req.body;
    const email = req.body.email.toLowerCase();

    const year = email.match(/\d{4}/)[0];
    const id = email.match(/[^@]*/)[0];

    if (!(name && email && password && section)) {
      return res.status(400).json({ msg: "All fields are compulsory" });
    }

    // checking if user exists already
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hashing password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a token
    const token = jwt.sign({ email }, process.env.jwtkey, { expiresIn: "2h" });

    // creating new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      section,
      year,
      id,
      token,
    });

    user.password = undefined;
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
