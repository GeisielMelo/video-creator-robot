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

  async create(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return { error: false, message: "User not found" };
      }

      const createdSolicitation = await Solicitation.create({
        userId: userId,
        status: "pending",
      });

      return createdSolicitation._id;
    } catch (error) {
      return { error: false, message: "Internal server error" };
    }
  }

  async update(id, status) {
    try {
      const solicitation = await Solicitation.findById(id);

      if (!solicitation) {
        return { error: false, message: "Solicitation not found" };
      }

      await solicitation.updateOne({ status });

      return { success: true, message: `Solicitation ${id} updated` };
    } catch (error) {
      return { error: false, message: "Internal server error" };
    }
  }

  async delete(id) {
    try {
      const solicitation = await Solicitation.findById(id);

      if (!solicitation) {
        return { error: false, message: "Solicitation not found" };
      }

      await solicitation.deleteOne();

      return { success: true, message: `Solicitation ${id} deleted` };
    } catch (error) {
      return { error: false, message: "Internal server error" };
    }
  }
}

export default new SolicitationController();
