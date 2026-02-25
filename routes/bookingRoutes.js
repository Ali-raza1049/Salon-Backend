// src/routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getBookings);

// Update a booking (e.g., change status)
router.put("/:id", updateBooking);

// Delete a booking
router.delete("/:id", deleteBooking);

export default router;