const fs = require("fs").promises;
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { exec } = require("child_process");

class VideoConcatenator {
  constructor(userId) {
    this.userId = userId;
    this.countdownTime = 6;
    this.userFolder = path.resolve(__dirname, `../downloads/${userId}`);
    this.outputVideo = path.resolve(__dirname, `../downloads/${userId}/out.mp4`);
    this.backgroundFile = path.resolve(__dirname, "../templates/background.mp4");
  }

  async _listOrganizedFilesInFolder() {
    try {
      const stats = await fs.stat(this.userFolder);

      if (!stats.isDirectory()) {
        throw new Error("Not a directory!");
      }

      const files = await fs.readdir(this.userFolder);

      const organizedFiles = files.reduce((result, file) => {
        const filePath = path.resolve(this.userFolder, file);
        const fileName = path.basename(file);
        const fileExtension = path.extname(file);
        const match = fileName.match(/^(\w+)(\d+)\.(mp3|png)$/);

        if (match) {
          const [, fileType, fileNumber, fileFormat] = match;

          if (!result[fileNumber]) {
            result[fileNumber] = {};
          }

          result[fileNumber][`${fileType}.${fileFormat}`] = filePath;
        }

        return result;
      }, {});

      const filteredFiles = Object.entries(organizedFiles).reduce((result, [key, value]) => {
        if (value["question.mp3"] && value["questionWithAlternatives.png"] && value["questionWithAnswer.png"]) {
          result.push({
            "question.mp3": value["question.mp3"],
            "questionWithAlternatives.png": value["questionWithAlternatives.png"],
            "questionWithAnswer.png": value["questionWithAnswer.png"],
          });
        }
        return result;
      }, []);

      return filteredFiles;
    } catch (error) {
      throw new Error(`Error listing files in folder: ${error.message}`);
    }
  }

  async _defineQuestionLength(filePath) {
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

  async _createFfmpegCommand(array, background) {
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
    try {
      const files = await this._listOrganizedFilesInFolder();
      const updatedFiles = await Promise.all(
        files.map(async (element) => {
          let questionPath = element["question.mp3"];
          const questionLength = await this._defineQuestionLength(questionPath);
          element["questionLength"] = questionLength + this.countdownTime;
          return element;
        })
      );
      const ffmpegCommand = await this._createFfmpegCommand(updatedFiles, this.backgroundFile);
      console.log(ffmpegCommand);
      await this._executeCommand(ffmpegCommand);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = VideoConcatenator;
