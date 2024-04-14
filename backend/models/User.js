import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    designation: {
      type: String,
    },
    role: {
      type: String,
    },
    id: {
      type: String,
    },
    contact: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    retypedPassword: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
