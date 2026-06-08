import express from "express";
import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.get("/:id", getSingleBlog);
router.delete("/:id", deleteBlog);


export default router;