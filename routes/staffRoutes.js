import express from "express";
import {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";
import upload from "../MiddleWare/upload.js"; 

const router = express.Router();

// Get all staff
router.get("/", getStaff);

// Add a new staff with image upload
router.post("/", upload.single("image"), addStaff);

// Update existing staff with optional new image
router.put("/:id", upload.single("image"), updateStaff);

// Delete staff
router.delete("/:id", deleteStaff);

export default router;