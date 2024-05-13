import mongoose from "mongoose";

mongoose.connect(process.env.mongoDbUrl + "/users");

const emailSignupVerificationSchema = new mongoose.Schema({
  email: String,
  otp: Number,
});

const EmailSignupVerification = mongoose.model(
  "EmailSignupVerification",
  emailSignupVerificationSchema,
);

export default EmailSignupVerification;
