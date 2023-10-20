const fs = require("fs").promises;

function createFfmpegCommand(array, background) {
  return new Promise(async (resolve, reject) => {
    try {
      const commands = [];

      array.forEach((element) => {
        let questionImage = element["questionWithAlternatives.png"];
        let answerImage = element["questionWithAnswer.png"];
        let questionLength = element.questionLength;

        const command = `-loop 1 -t ${questionLength} -i ${questionImage} -loop 1 -t 1 -i ${answerImage}`;
        commands.push(command);
      });

      const ffmpegCommand = `ffmpeg -i ${background} ${commands.join(
        " "
      )} -filter_complex "[1:v][2:v]concat=n=${
        commands.length * 2
      }:v=1:a=0[v1];[0:v][v1]overlay=shortest=1" out.mp4`;

      resolve(ffmpegCommand);
    } catch (error) {
      reject(error); 
    }
  });
}

module.exports = createFfmpegCommand;
