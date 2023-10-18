import path from "path";
import { createQuizImages } from "../utils/quiz/textToImage";
import { zipFiles } from "../utils/createZip.js";
import { deletePNGFiles } from "../utils/folders";
class FileController {
  async downloadFile(req, res) {
    try {
      const { userId } = req.params;
      const filePath = path.join(__dirname, `../downloads/${userId}/file.zip`);
      res.sendFile(filePath, { headers: { "Content-Type": "file/zip" } });
    } catch (error) {
      return res.status(500).json({ error: "Falha ao baixar o arquivo." });
    }
  }

  // Generate the quiz images.
  async createQuiz(req, res) {
    try {
      const { userId, questions } = req.body;

      // Create Images.
      await createQuizImages(questions, userId);

      // Zip Images.
      await zipFiles(`../downloads/${userId}`, "file");

      // Delete PNG Files.
      await deletePNGFiles(`../downloads/${userId}`);

      return res.status(200).json({ message: "Imagens geradas com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Falha ao gerar imagens do quiz." });
    }
  }
}

export default new FileController();
