import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContact);

router.get("/", protect, getContacts);

export default router;