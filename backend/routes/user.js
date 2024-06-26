import express from "express";
import signupRouter from "./signup.js";
import userexistRouter from "./userexist.js";
import loginRouter from "./login.js";
import dataRouter from "./data.js";
import timetableRouter from "./timetable.js";
import forgotpasswordRouter from "./forgotpassword.js";
import resetpasswordRouter from "./resetpassword.js"


const router = express.Router();

router.use("/signup", signupRouter);
router.use("/exist", userexistRouter);
router.use("/login", loginRouter);
router.use("/data", dataRouter);
router.use("/timetable", timetableRouter);
router.use("/forgot-password", forgotpasswordRouter);
router.use("/reset-password", resetpasswordRouter );

export default router;
