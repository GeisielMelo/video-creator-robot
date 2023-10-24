import path from "path";
import TextToImagesCreator from "../modules/TextToImagesCreator";
import ImageToVideoCreator from "../modules/ImageToVideoCreator";
import AudioConcatenator from "../modules/AudioConcatenator";

//import TextToSpeechCreator from "../modules/TextToSpeechCreator"

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
    // Todo
    // CRIAR MÉTODO PARA DELETAR ARQUIVOS ANTERIORES.
    // REMOVER CRIAÇÃO DE PASTAS DE TEXT TO IMAGES E ADICIONAR EM FOLDERS.
    try {
      const { userId, questions } = req.body;

      // OK
      const textToImagesCreator = new TextToImagesCreator(questions, userId);
      await textToImagesCreator.render();

      // OK
      const imageToVideoCreator = new ImageToVideoCreator(userId);
      await imageToVideoCreator.render();

      // Todo
      //const textToSpeechCreator = new TextToSpeechCreator(questions, userId);
      //await textToSpeechCreator.create();

      // OK
      // Todo mover fetchAudioQuestionsPath para dentro da classe.
      const audioConcatenator = new AudioConcatenator(userId);
      await audioConcatenator.concatenate();

      return res.status(200).json({ message: "Imagens geradas com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Falha ao gerar imagens do quiz.", error });
    }
  }
}

export default new FileController();
