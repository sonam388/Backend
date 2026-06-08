import Blog from "../models/BlogModel.js";

export const createBlog = async (
  req,
  res
) => {
  try {
    const {
      title,
      image,
      content,
      author,
    } = req.body;

    const blog = await Blog.create({
      title,
      image,
      content,
      author,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogs = async (
  req,
  res
) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleBlog = async (
  req,
  res
) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (
  req,
  res
) => {
  try {
    await Blog.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Blog Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};