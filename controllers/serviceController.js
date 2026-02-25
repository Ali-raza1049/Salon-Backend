import Service from "../modals/Service.js";

// GET all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new service
export const createService = async (req, res) => {
  try {
    const { name, category, duration, price } = req.body;

    const newService = new Service({
      name,
      category,
      duration,
      price,
    });

    await newService.save();

    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, duration, price } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, category, duration, price },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
