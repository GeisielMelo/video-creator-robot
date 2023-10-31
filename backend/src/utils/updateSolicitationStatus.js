require("dotenv").config();
import mongoose from "mongoose";
import Solicitation from "../models/Solicitation";

async function updateSolicitationStatus(solicitationId, newStatus) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const solicitation = await Solicitation.findById(solicitationId);

    if (!solicitation) {
      throw new Error("Solicitation not found");
    }

    await Solicitation.findByIdAndUpdate(solicitationId, { status: newStatus }, { new: true });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await mongoose.connection.close();
  }
}

export default updateSolicitationStatus;
