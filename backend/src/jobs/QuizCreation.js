import { createFolder, deleteUserFiles } from "../utils/folders";
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

    try {
      const filesManagement = new FilesManagement(userId, solicitationNumber);
      await filesManagement.createUserFolders();
      await filesManagement.clearProcessingFolder();

      return console.log("Successfully created.");
    } catch (error) {
      return console.log(error);
    }
  },
};
