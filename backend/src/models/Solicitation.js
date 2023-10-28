import mongoose from "mongoose";

const solicitationSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    solicitation: { type: Array, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Solicitation", solicitationSchema);
