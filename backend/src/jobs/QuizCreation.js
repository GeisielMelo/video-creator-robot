import TextToImagesCreator from "../modules/TextToImagesCreator";
import ImageToVideoCreator from "../modules/ImageToVideoCreator";
import AudioConcatenator from "../modules/AudioConcatenator";
import TextToSpeechCreator from "../modules/TextToSpeechCreator";
import VideoCreator from "../modules/VideoCreator";
import FilesManagement from "../modules/FilesManagement";
import SolicitationController from "../controllers/SolicitationController";
import QuizController from "../controllers/QuizController";

export default {
  key: "QuizCreation",
  async handle({ data }) {
    const { userId, questions, solicitationNumber } = data.quiz;

    const filesManagement = new FilesManagement(userId);
    const textToImagesCreator = new TextToImagesCreator(questions, userId);
    const textToSpeechCreator = new TextToSpeechCreator(questions, userId);
    const imageToVideoCreator = new ImageToVideoCreator(userId);
    const audioConcatenator = new AudioConcatenator(userId);
    const videoCreator = new VideoCreator(userId, solicitationNumber);

    try {
      await filesManagement.createUserFolders();
      await filesManagement.clearProcessingFolder();
      await textToImagesCreator.render();
      await textToSpeechCreator.CreateAudiosWithElevenLabs();
      await imageToVideoCreator.render();
      await audioConcatenator.concatenate();
      await videoCreator.render();
      await filesManagement.clearProcessingFolder();
      await QuizController.create(userId, questions);
      await SolicitationController.update(solicitationNumber, "done");
      return console.log("Job - Quiz Creation: Done");
    } catch (error) {
      await SolicitationController.update(solicitationNumber, "fail");
      return console.log(error);
    }
  },
};