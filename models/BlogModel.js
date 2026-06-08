import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "Gaushala Admin",
    },
  },
  {
    timestamps: true,
  }
);

const blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default blog;

