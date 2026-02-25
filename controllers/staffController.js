import Staff from "../modals/Staff.js";


export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addStaff = async (req, res) => {
  try {
    const { name, role, status, phone, email } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const newStaff = new Staff({ name, role, status, phone, email, image });
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedStaff = await Staff.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};