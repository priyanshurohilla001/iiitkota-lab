import express from "express";
import emailVerificationRouter from "./emailverification.js";
import userRouter from "./user.js";

const router = express.Router();

router.use("/emailverification", emailVerificationRouter);
router.use("/user", userRouter);

export default router;
