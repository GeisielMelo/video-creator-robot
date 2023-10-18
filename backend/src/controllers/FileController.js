import path from "path";
import { createQuizImages } from "../utils/quiz/textToImage";

class FileController {
  async downloadImage(req, res) {
    try {
      const imagePath = path.join(__dirname, "../img/image.png");
      res.sendFile(imagePath, { headers: { "Content-Type": "image/png" } });
    } catch (error) {
      return res.status(500).json({ error: "Falha ao enviar a imagem." });
    }
  }

  async createQuiz(req, res) {
    try {
      const { userId, questions } = req.body;

      // Create Images.

      await createQuizImages(questions, userId);

      // Zip Images.

      // Send Zip to User as response.

      return res.status(200).json({ message: "Imagens geradas com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Falha ao gerar imagens do quiz." });
    }
  }
}

export default new FileController();
