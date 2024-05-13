import express from "express";
import { Router } from "express";
import  User  from "../db/usersdb.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    if (!req.query.email) {
      res.status(400).json({ msg: "email is required" });
    } else {
      const email = req.query.email;
      const data = await User.findOne({ email: email });
      if (data) {
        res.json(true);
      } else {
        res.json(false);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
