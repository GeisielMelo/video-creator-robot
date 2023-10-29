import { createFolder, deleteUserFiles } from "../utils/folders";
import TextToImagesCreator from "../modules/TextToImagesCreator";
import ImageToVideoCreator from "../modules/ImageToVideoCreator";
import AudioConcatenator from "../modules/AudioConcatenator";
import TextToSpeechCreator from "../modules/TextToSpeechCreator";
import VideoCreator from "../modules/VideoCreator";

export default {
  key: "QuizCreation",
  async handle({ data }) {
    const {
      quiz: { userId, questions, solicitationNumber },
    } = data;

    await new Promise(resolve => setTimeout(resolve, 2000));
    return console.log(userId, questions, solicitationNumber);
  },
};


// await deleteUserFiles(userId);
// await createFolder(`../downloads/${userId}/${solicitationNumber}`);

// const textToImagesCreator = new TextToImagesCreator(questions, userId);
// await textToImagesCreator.render();

// const textToSpeechCreator = new TextToSpeechCreator(questions, userId);
// await textToSpeechCreator.CreateAudiosWithElevenLabs();

// const imageToVideoCreator = new ImageToVideoCreator(userId);
// await imageToVideoCreator.render();

// const audioConcatenator = new AudioConcatenator(userId);
// await audioConcatenator.concatenate();

// const videoCreator = new VideoCreator(userId, solicitationNumber);
// await videoCreator.render();

// await deleteUserFiles(userId);