import express from "express";
import { TueB } from "../basic.js";
import authmiddleware from "./authmiddleware.js";
import User from "../db/usersdb.js";

const router = express.Router();
router.use(authmiddleware);

router.post("/", async (req, res) => {
  try {
    const { email, day } = req.body;

    if (!(email && day)) {
      return res.status(400).send("some data missing");
    }

    const data = await User.findOne({ email });
    if (!data) {
      return res.status(400).send("User not found");
    }

    const subSection = data.section;

    const section = subSection[0];

    let dayName;

    if (day == 1) {
      dayName = "Mon";
    } else if (day == 2) {
      dayName = "Tue";
    } else if (day == 3) {
      dayName = "Wed";
    } else if (day == 4) {
      dayName = "Thu";
    } else if (day == 5) {
      dayName = "Fri";
    } else if (day == 6) {
      dayName = "Sat";
    } else if (day == 7) {
      dayName = "Sun";
    }

    return res.status(200).json(TueB);
  } catch (error) {
    res.status(500).send("Server erro");
  }
});

export default router;
