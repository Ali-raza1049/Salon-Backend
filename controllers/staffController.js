// src/controllers/staffController.js
import Staff from "../modals/Staff.js";

// GET all staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching staff." });
  }
};

// ADD new staff
export const addStaff = async (req, res) => {
  try {
    const { name, role, status, phone, email } = req.body;
    const image = req.file ? req.file.path : undefined; // Cloudinary URL

    const newStaff = new Staff({ name, role, status, phone, email, image });
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error adding staff." });
  }
};

// UPDATE staff
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL
    }

    const updatedStaff = await Staff.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found." });
    }

    res.json(updatedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating staff." });
  }
};

// DELETE staff
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found." });
    }

    res.json({ message: "Staff deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting staff." });
  }
};