const fs = require("fs").promises;

function createFfmpegCommand(array, background) {
  return new Promise(async (resolve, reject) => {
    try {
      const commands = [];

      array.forEach((element) => {
        let questionImage = element["questionWithAlternatives.png"];
        let answerImage = element["questionWithAnswer.png"];
        let questionLength = element.questionLength;

        const command = `-loop 1 -t ${questionLength} -i ${questionImage} -loop 1 -t 2 -i ${answerImage}`;
        commands.push(command);
      });

      const ffmpegCommand = `ffmpeg -i ${background} ${commands.join(
        " "
      )} -filter_complex "[1:v][2:v]concat=n=2:v=1:a=0[v1];[3:v][4:v]concat=n=2:v=1:a=0[v2];[5:v][6:v]concat=n=2:v=1:a=0[v3];[7:v][8:v]concat=n=2:v=1:a=0[v4];[9:v][10:v]concat=n=2:v=1:a=0[v5];[11:v][12:v]concat=n=2:v=1:a=0[v6];[v1][v2]concat=n=2:v=1:a=0[v7];[v3][v4]concat=n=2:v=1:a=0[v8];[v5][v6]concat=n=2:v=1:a=0[v9];[v7][v8]concat=n=2:v=1:a=0[v10];[v9][v10]concat=n=2:v=1:a=0[v11];[0:v][v11]overlay=shortest=1[v12]" -map "[v12]" out.mp4"
      `;

      resolve(ffmpegCommand);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = createFfmpegCommand;
