const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { exec } = require("child_process");

class ImageToVideoCreator {
  constructor(userId) {
    this.userId = userId;
    this.userFolder = path.resolve(__dirname, `../downloads/${userId}`);
    this.outputVideo = path.resolve(__dirname, `../downloads/${userId}/out.mp4`);
    this.backgroundFile = path.resolve(__dirname, "../templates/background.mp4");
    this.countdownFile = path.resolve(__dirname, "../templates/countdown.wav");
  }

  async _fetchQuizData() {
    try {
      let questionWithAlternatives = [];
      let questionWithAnswer = [];
      let questionAudio = [];
      const files = await fs.promises.readdir(path.resolve(__dirname, `../downloads/${this.userId}`));

      files.forEach((file) => {
        const filePath = path.join(path.resolve(__dirname, `../downloads/${this.userId}`), file);
        const fileExt = path.extname(filePath);

        if (file.includes("questionWithAlternatives")) {
          questionWithAlternatives.push(filePath);
        }

        if (file.includes("questionWithAnswer")) {
          questionWithAnswer.push(filePath);
        }

        if (fileExt === ".mp3" || fileExt === ".wav") {
          if (file.includes("question")) {
            questionAudio.push(filePath);
          }
        }
      });

      return [questionWithAlternatives, questionWithAnswer, questionAudio];
    } catch (error) {
      console.error(error);
    }
  }

  async _fetchAudioLength(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
        } else {
          const duration = Math.round(metadata.format.duration);
          resolve(duration);
        }
      });
    });
  }

  async _sortedListsWithAudioLength(questionWithAlternatives, questionWithAnswer, questionAudio) {
    const zippedLists = [];

    for (let i = 0; i < questionWithAlternatives.length; i++) {
      zippedLists.push({
        questionWithAlternatives: questionWithAlternatives[i],
        questionWithAnswer: questionWithAnswer[i],
        questionLength: await this._fetchAudioLength(questionAudio[i]),
      });
    }

    return zippedLists;
  }

  async _createFfmpegCommand(shortedData) {
    return new Promise(async (resolve, reject) => {
      try {
        let commands = [];
        let filters = [];
        let countdownLength = await this._fetchAudioLength(this.countdownFile);

        shortedData.forEach((element) => {
          let questionImage = element.questionWithAlternatives;
          let answerImage = element.questionWithAnswer;
          let questionLength = element.questionLength + countdownLength;

          const command = `-loop 1 -t ${questionLength} -i ${questionImage} -loop 1 -t 1 -i ${answerImage}`;
          commands.push(command);
        });

        const ffmpegCommand = `ffmpeg -i ${this.backgroundFile} ${commands.join(
          " "
        )} -filter_complex "[1:v][2:v]concat=n=2:v=1:a=0[v1];[3:v][4:v]concat=n=2:v=1:a=0[v2];[5:v][6:v]concat=n=2:v=1:a=0[v3];[7:v][8:v]concat=n=2:v=1:a=0[v4];[9:v][10:v]concat=n=2:v=1:a=0[v5];[11:v][12:v]concat=n=2:v=1:a=0[v6];[v1][v2]concat=n=2:v=1:a=0[v7];[v3][v4]concat=n=2:v=1:a=0[v8];[v5][v6]concat=n=2:v=1:a=0[v9];[v7][v8]concat=n=2:v=1:a=0[v10];[v9][v10]concat=n=2:v=1:a=0[v11];[0:v][v11]overlay=shortest=1[v12]" -map "[v12]" -map 0:a -c:a copy ${
          this.outputVideo
        }"
        `;

        resolve(ffmpegCommand);
      } catch (error) {
        reject(error);
      }
    });
  }

  async _executeCommand(command) {
    return new Promise((resolve, reject) => {
      const process = exec(command);

      process.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      process.stderr.on("data", (data) => {
        console.error(data.toString());
      });

      process.on("exit", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Processo encerrado com código de saída ${code}`));
        }
      });
    });
  }

  async render() {
    const data = await this._fetchQuizData();
    const shortedData = await this._sortedListsWithAudioLength(...data);
    const ffmpegCommand = await this._createFfmpegCommand(shortedData);
    console.log(ffmpegCommand);
    //await this._executeCommand(ffmpegCommand);
  }
}

module.exports = ImageToVideoCreator;
