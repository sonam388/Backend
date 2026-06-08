import express from "express";

import {
  createVolunteer,
  getVolunteers,
} from "../controllers/volunteerController.js";

const router = express.Router();

router.post("/", createVolunteer);

router.get("/", getVolunteers);

export default router;