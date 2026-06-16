import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Review =
  mongoose.models.Review ||
  mongoose.model("Review", reviewSchema);

export default Review;