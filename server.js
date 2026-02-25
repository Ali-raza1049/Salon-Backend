import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => res.send("Salon Backend Running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));