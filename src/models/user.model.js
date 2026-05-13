import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    // confirmPassword: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
