import express from "express";

import {
  addGalleryImage,
  getGalleryImages,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

const router = express.Router();

router.post("/", addGalleryImage);

router.get("/", getGalleryImages);

router.delete(
  "/:id",
  deleteGalleryImage
);

export default router;