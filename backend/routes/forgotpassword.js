import express from "express";
import User from "../db/usersdb.js";
import jwt from "jsonwebtoken";
import Mailgun from "mailgun-js";
import { parseJwt } from "../functions/parseJWT.js";

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
    }
  );

  const url = process.env.frontendUrl + `/reset-password/${forogotPassToken}`;

  const api_key = process.env.mailgunApiKey;
  const domain = "mail.priyanshu.live";
  const from_who = "priyanshu@mail.priyanshu.live";

  const mailgun = new Mailgun({ apiKey: api_key, domain: domain });

  const data = {
    from: "priyanshu@mail.priyanshu.live",
    to: `${email}`,
    subject: "Password Reset Email",
    text: `Click on the link to reset your password: ${url}`,
  };

  mailgun.messages().send(data, (err, body) => {
    if (err) {
      console.log("got an error: ", err);
      return res.json({ error: err });
    } else {
      return res.send("Email sent successfully");
    }
  });

});

export default router;
