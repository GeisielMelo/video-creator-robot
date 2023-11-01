require("dotenv").config();
import mongoose from "mongoose";
import Solicitation from "../models/Solicitation";
import User from "../models/User";

class SolicitationController {
  async index(req, res) {
    try {
      const { userId } = req.params;
      const solicitations = await Solicitation.find({ userId });

      if (!solicitations || solicitations.length === 0) {
        return res.status(404).json({ error: "Solicitations not found" });
      }

      return res.json(solicitations);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { userId, solicitationType } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const createdSolicitation = await Solicitation.create({
        userId: userId,
        type: solicitationType,
        status: "pending",
      });

      return res.json(createdSolicitation._id);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(solicitationId, newStatus) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await Solicitation.findByIdAndUpdate(solicitationId, { status: newStatus }, { new: true });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await mongoose.connection.close();
    }
  }
}

export default new SolicitationController();
