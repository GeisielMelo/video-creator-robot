import path from "path";
import TextToImagesCreator from "../modules/TextToImagesCreator";
import VideoConcatenator from "../modules/VideoConcatenator";
//import TextToSpeechCreator from "../modules/TextToSpeechCreator"
//import AudioConcatenator  from "../modules/AudioConcatenator"

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

  async createQuiz(req, res) {
    // CRIAR METODO PARA DELETAR ARQUIVOS ANTERIORES.
    try {
      const { userId, questions } = req.body;
      // Creating instances.
      const textToImagesCreator = new TextToImagesCreator(questions, userId);
      const videoConcatenator = new VideoConcatenator(userId);
      //const textToSpeechCreator = new TextToSpeechCreator();
      //const audioConcatenator = new AudioConcatenator();

      await textToImagesCreator.render();
      await videoConcatenator.render();
      //await textToSpeechCreator.create();
      //await audioConcatenator.concatenate();

      return res.status(200).json({ message: "Imagens geradas com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Falha ao gerar imagens do quiz.", error });
    }
  }
}

export default new FileController();
