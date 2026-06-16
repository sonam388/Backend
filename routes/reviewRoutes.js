import express from "express";
import {
  createReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);

router.get("/", getApprovedReviews);

router.get("/admin", getAllReviews);

router.put("/:id", approveReview);

router.delete("/:id", deleteReview);

export default router;