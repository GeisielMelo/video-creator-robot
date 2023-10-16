import path from "path";

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
      const { questions } = req.body;
      console.log(questions);
      

    } catch (error) {
      return res.status(500).json({ error: "Falha ao gerar imagens do quiz." });
    }
  }
}

export default new FileController();
