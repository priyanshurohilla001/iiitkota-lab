import express from "express";
import { Router } from "express";
import Mailgun from "mailgun-js";
import fs from "fs";
import EmailSignupVerification from "../db/emailsignupverification.js";

const router = Router();
router.use(express.json());

const api_key = process.env.mailgunApiKey;
const domain = "mail.priyanshu.live";
const from_who = "priyanshu@mail.priyanshu.live";

router.post("/generate", (req, res) => {
  if (!req.body.email) {
    return res.status(400).send("Email is required");
  }

  const otp = Math.floor(1000 + Math.random() * 9000);

  console.log(otp);
  const email = req.body.email;

  EmailSignupVerification({
    email: email,
    otp: otp,
  }).save();

  const mailgun = new Mailgun({ apiKey: api_key, domain: domain });

  const htmlTemplate = fs.readFileSync("./email.html", "utf8");
  const html = htmlTemplate.replace("${otp}", otp);

  const data = {
    from: from_who,
    to: email,
    subject: `${otp} Email Verification OTP IIIT KOTA`,
    html: html,
  };

  mailgun.messages().send(data, (err, body) => {
    if (err) {
      console.log("got an error: ", err);
      res.json({ error: err });
    } else {
      res.send("Email sent successfully");
    }
  });
});

router.post("/verify", (req, res) => {
  if (!req.body.email) {
    return res.status(400).send("Email is required");
  }
  if (!req.body.otp) {
    return res.status(400).send("OTP is required");
  }
  const email = req.body.email;
  const otp = req.body.otp;

  EmailSignupVerification.findOne({ email: email, otp: otp })
    .then((data) => {
      if (data) {
        res.send("Email Verified Successfully");
      } else {
        res.status(500).send("Invalid OTP");
      }
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

export default router;
