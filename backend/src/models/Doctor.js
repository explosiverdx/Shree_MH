import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 0 },
    qualification: { type: String, required: true },
    fee: { type: Number, default: 75 },
    image: { type: String, default: "" },
    bio: { type: String, default: "" },
    availableDays: [{ type: String }],
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
