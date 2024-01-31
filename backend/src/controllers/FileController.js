import path from "path";
import { createReadStream, statSync, existsSync } from 'fs';
import { fetchSolicitations } from "../utils/folders";
import Queue from "../middlewares/queue";

class FileController {
  async downloadFile(req, res) {
    try {
      const { userId, solicitationNumber } = req.params;
      console.log(userId, solicitationNumber)
      const filePath = path.join(__dirname, `../archives/${userId}/output/${solicitationNumber}.mp4`);

      if (!existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      const stat = statSync(filePath);

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader('Content-Length', `${stat.size}`);
      res.setHeader("Content-Disposition", `attachment; filename=${solicitationNumber}.mp4`);

      const stream = createReadStream(filePath);
      stream.pipe(res);
      console.log('Finished')
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Download: Internal Server Error." });
    }
  }

  async createQuiz(req, res) {
    try {
      const { userId, questions, solicitationNumber } = req.body;
      const quiz = { userId, questions, solicitationNumber };
      await Queue.add("QuizCreation", { quiz });
      return res.status(200).json({ success: "Quiz solicitation created." });
    } catch (error) {
      return res.status(500).json({ error: "Creation: Internal server error." });
    }
  }

  async fetchSolicitationData(req, res) {
    try {
      const { userId } = req.params;
      const data = await fetchSolicitations(userId);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Solicitation: Internal server error." });
    }
  }
}

export default new FileController();
