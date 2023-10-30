const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { exec } = require("child_process");

class ImageToVideoCreator {
  constructor(userId) {
    this.userId = userId;
    this.outputVideo = path.resolve(__dirname, `../archives/${userId}/processing/out.mp4`);
    this.backgroundFile = path.resolve(__dirname, "../templates/background.mp4");
    this.countdownFile = path.resolve(__dirname, "../templates/countdown.wav");
    this.answerFile = path.resolve(__dirname, "../templates/answer.wav");
  }

  async _fetchQuizData() {
    try {
      let questionWithAlternatives = [];
      let questionWithAnswer = [];
      let questionAudio = [];
      const files = await fs.promises.readdir(path.resolve(__dirname, `../archives/${this.userId}/processing`));

      files.forEach((file) => {
        const filePath = path.join(path.resolve(__dirname, `../archives/${this.userId}/processing`), file);
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
          const duration = metadata.format.duration;
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
        let filterComplex = [];
        let countdownLength = await this._fetchAudioLength(this.countdownFile);
        let answerLength = await this._fetchAudioLength(this.answerFile);

        shortedData.forEach((element) => {
          let questionImage = element.questionWithAlternatives;
          let answerImage = element.questionWithAnswer;
          let questionLength = element.questionLength + countdownLength;

          const command = `-loop 1 -t ${questionLength} -i ${questionImage} -loop 1 -t ${answerLength} -i ${answerImage}`;
          commands.push(command);
        });

        for (let i = 1; i <= shortedData.length; i++) {
          filterComplex.push(`[${i * 2 - 1}:v][${i * 2}:v]concat=n=2:v=1:a=0[v${i}];`);
        }

        const setSecondPartFilter = (value) => {
          if (value === 5) {
            return "[v3][v4]concat=n=2:v=1:a=0[v6];[v5][v6]concat=n=2:v=1:a=0[v7];[v1][v2]concat=n=2:v=1:a=0[v8];[v7][v8]concat=n=2:v=1:a=0[v9];[0:v][v9]overlay=shortest=1[v10]";
          }
          if (value === 6) {
            return "[v3][v4]concat=n=2:v=1:a=0[v7];[v5][v6]concat=n=2:v=1:a=0[v8];[v1][v2]concat=n=2:v=1:a=0[v9];[v7][v8]concat=n=2:v=1:a=0[v10];[v9][v10]concat=n=2:v=1:a=0[v11];[0:v][v11]overlay=shortest=1[v12]";
          }
        };

        const ffmpegCommand = `ffmpeg -i ${this.backgroundFile} ${commands.join(" ")} -filter_complex "${filterComplex.join("")}${setSecondPartFilter(commands.length)}" -map "[v${
          commands.length * 2
        }]" -c:v h264_amf ${this.outputVideo}`;

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

  // This is a provisory function to wait for the images be saved on the user folder.
  // It will be replaced by a timer function witch checks the folder 3 times for images,  if not find the files return an error.
  async _waitSomeTime(seconds) {
    return new Promise((resolve) => {
      console.log(`Waiting for images...`);
      setTimeout(() => {
        resolve();
      }, seconds);
    });
  }

  async render() {
    try {
      await this._waitSomeTime(5000);
      const data = await this._fetchQuizData();
      const shortedData = await this._sortedListsWithAudioLength(...data);
      const ffmpegCommand = await this._createFfmpegCommand(shortedData);
      await this._executeCommand(ffmpegCommand);
    } catch (error) {
      throw new Error(`Fail on creating video track.  ${error}`)
    }
  }
}

module.exports = ImageToVideoCreator;
