const fs = require("fs").promises;
const path = require("path");
const listOrganizedFilesInFolder = require("./listOrganizedFilesInFolder");
const defineQuestionLength = require("./defineQuestionLength");
const createFfmpegCommand = require("./createFfmpegCommand");
const concatenateImages = require("./concatenateImages");

async function main(userId) {
  const countdownTime = 6;
  const backgroundVideo = path.resolve(__dirname, "../../templates/background.mp4");
  try {
    // Obter a lista de arquivos.
    const files = await listOrganizedFilesInFolder(`../../downloads/${userId}/`);

    // Criar uma nova lista com o comprimento do áudio.
    const updatedFiles = await Promise.all(
      files.map(async (element) => {
        let questionPath = element["question.mp3"];
        const questionLength = await defineQuestionLength(questionPath);
        element["questionLength"] = questionLength + countdownTime;
        return element;
      })
    );

    const ffmpegCommand = await createFfmpegCommand(updatedFiles, backgroundVideo);
    console.log(ffmpegCommand);
    const concatenate = await concatenateImages(ffmpegCommand);
  } catch (error) {
    console.error("Erro:", error);
  }
}

main('65298a61adcfeb0cebc076c7');
