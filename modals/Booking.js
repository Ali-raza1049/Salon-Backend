// src/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Service" },
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
    stylist: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Staff" },
      name: { type: String, required: true },
      role: { type: String },
      image: { type: String },
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    customerName: { type: String },
    customerPhone: { type: String },
    status: { type: String, default: "Pending" }, 
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);