import express from "express";
import User from "../db/usersdb.js";
import jwt from "jsonwebtoken";
import { parseJwt } from "../functions/parseJWT.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.password || !req.body.token) {
    return res.status(400).send("all fields are required");
  }

  const { token, password } = req.body;
  const email = parseJwt(token).email;

  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(400).send("Email is not registered");
  }

  try {
    jwt.verify(req.body.token, process.env.jwtkey + userExists.password);
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.status(400).send("Token has expired");
    }
    return res.status(400).send("Invalid token");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.updateOne({ email }, { password: hashedPassword });
  if (!user) {
    return res.status(400).send("Email is not registered");
  }

  res.send("Password updated successfully");
});

export default router;
