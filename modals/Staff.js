import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: {
      type: String,
      default: "https://randomuser.me/api/portraits/lego/1.jpg",
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;