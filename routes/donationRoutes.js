import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createDonation,
  getDonations,
} from "../controllers/donationController.js";

const router = express.Router();

router.post("/", createDonation);

router.get("/", protect, getDonations);

export default router;