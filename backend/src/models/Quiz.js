import mongoose from "mongoose";

const quizSchema = mongoose.Schema(
  {
    questions: { type: Array, required: true },
    userId: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Questions", quizSchema);