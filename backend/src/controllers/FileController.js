import path from "path";
import { createFolder, fetchSolicitations } from "../utils/folders";
import TextToImagesCreator from "../modules/TextToImagesCreator";
import ImageToVideoCreator from "../modules/ImageToVideoCreator";
import AudioConcatenator from "../modules/AudioConcatenator";
import TextToSpeechCreator from "../modules/TextToSpeechCreator";

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

      // CIAR CLASSE CONCATENADORA PARA JUNTAR VIDEO E AUDIO E FORMAR UM VIDEO, DEPOIS SALVA-LO EM UMA PASTA COM O NÚMERO DA SOLICITAÇÃO.

      return res.status(200).json({ message: "Imagens geradas com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Falha ao gerar imagens do quiz.", error });
    }
  }

  async fetchSolicitationData(req, res) {
    try {
      const { userId } = req.params;
      const data = await fetchSolicitations(userId);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Falha ao buscar dados.", error });
    }
  }
}

export default new FileController();
