import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    date: {
      type: Date,
      default: Date(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const feedBackModel = mongoose.model("feedBack", feedBackSchema);
export default feedBackModel;
