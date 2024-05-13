import express from "express";
import User from "../db/usersdb.js";
import { Router } from "express";
import authmiddleware from "./authmiddleware.js";

const router = Router();

router.use(authmiddleware);

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (user) {
      user.password = undefined;
      return res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
