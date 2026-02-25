import express from "express";
import {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";
import upload from "../MiddleWare/upload.js";

const router = express.Router();

router.get("/", getStaff);
router.post("/", upload.single("image"), addStaff);
router.put("/:id", upload.single("image"), updateStaff);
router.delete("/:id", deleteStaff);

export default router;