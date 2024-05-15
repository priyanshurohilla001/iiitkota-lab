import express from "express";
import User from "../db/usersdb.js";
import jwt from "jsonwebtoken";
import Mailgun from "mailgun-js";

const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).send("Email is required");
  }

  const email = req.body.email.toLowerCase();

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email is not registered");
  }

  const forogotPassToken = jwt.sign(
    { email },
    process.env.jwtkey + user.password,
    {
      expiresIn: "5min",
    },
  );

  const data = {
    from: "priyanshu@mail.priyanshu.live",
    to: `${email}`,
    subject: "Password Reset Email",
    text: `Click on the link to reset your password: ${process.env.clienturl}/reset-password/${forogotPassToken}`,
  };

  res.status(200).send(token);
});

export default router;
