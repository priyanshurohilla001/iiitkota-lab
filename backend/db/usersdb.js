import mongoose from "mongoose";

mongoose.connect(process.env.mongoDbUrl + "/users");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
