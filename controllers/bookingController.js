// src/controllers/bookingController.js
import Booking from "../modals/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { service, stylist, date, time, customerName, customerPhone } = req.body;

    if (!service || !stylist || !date || !time) {
      return res.status(400).json({ message: "All required fields are required" });
    }

    const newBooking = new Booking({
      service,
      stylist,
      date,
      time,
      customerName,
      customerPhone,
      status: "Pending", 
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body }; // can include status, date, time, etc.

    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};