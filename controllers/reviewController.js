import ReviewModel from "../models/ReviewModel.js";

// CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const { name, city, rating, message } = req.body;

    const review = await ReviewModel.create({
      name,
      city,
      rating,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET APPROVED REVIEWS (Frontend)
export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({
      status: "approved",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL REVIEWS (Admin)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// APPROVE REVIEW
export const approveReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.status = "approved";

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review approved successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};