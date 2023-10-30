import TextToImagesCreator from "../modules/TextToImagesCreator";
import ImageToVideoCreator from "../modules/ImageToVideoCreator";
import AudioConcatenator from "../modules/AudioConcatenator";
import TextToSpeechCreator from "../modules/TextToSpeechCreator";
import VideoCreator from "../modules/VideoCreator";
import FilesManagement from "../modules/FilesManagement";

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
      return console.log("Successfully created.");
    } catch (error) {
      return console.log(error);
    }
  },
};
