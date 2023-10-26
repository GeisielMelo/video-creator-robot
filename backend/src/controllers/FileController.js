import path from "path";
const fs = require("fs");
import { createFolder, fetchSolicitations } from "../utils/folders";
import TextToImagesCreator from "../modules/TextToImagesCreator";
import ImageToVideoCreator from "../modules/ImageToVideoCreator";
import AudioConcatenator from "../modules/AudioConcatenator";
import TextToSpeechCreator from "../modules/TextToSpeechCreator";
import VideoCreator from "../modules/VideoCreator";

class FileController {
  async downloadFile(req, res) {
    try {
      const { userId, solicitationNumber, file } = req.body;
      const filePath = path.join(__dirname, `../downloads/${userId}/${solicitationNumber}/${file}`);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      const stream = fs.createReadStream(filePath);

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename=${file}`);

      stream.pipe(res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Download: Internal Server Error." });
    }
  }

  async createQuiz(req, res) {
    try {
      const { userId, questions, solicitationNumber } = req.body;

      // CRIAR MÉTODO PARA DELETAR ARQUIVOS E MANTER SOMENTE PASTAS COM 11 DÍGITOS QEU CONTEM ARQUIVOS DENTRO.

      await createFolder(`../downloads/${userId}/${solicitationNumber}`);

      const textToImagesCreator = new TextToImagesCreator(questions, userId);
      await textToImagesCreator.render();

      const imageToVideoCreator = new ImageToVideoCreator(userId);
      await imageToVideoCreator.render();

      const textToSpeechCreator = new TextToSpeechCreator(questions, userId);
      await textToSpeechCreator.CreateAudiosWithElevenLabs();

      const audioConcatenator = new AudioConcatenator(userId);
      await audioConcatenator.concatenate();

      const videoCreator = new VideoCreator(userId, solicitationNumber);
      await videoCreator.render();

      return res.status(200);
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
