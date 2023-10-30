const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

class AudioConcatenator {
  constructor(userId) {
    this.userId = userId;
    this.countdown = path.resolve(__dirname, `../templates/countdown.wav`);
    this.answer = path.resolve(__dirname, `../templates/answer.wav`);
    this.outputAudio = path.resolve(__dirname, `../archives/${userId}/processing/out.mp3`);
  }

  async _fetchAudioQuestionsPath() {
    try {
      let questionsArray = [];
      const files = await fs.promises.readdir(path.resolve(__dirname, `../archives/${this.userId}/processing`));

      files.forEach((file) => {
        const filePath = path.join(path.resolve(__dirname, `../archives/${this.userId}/processing`), file);
        const fileExtension = path.extname(filePath);

        if (fileExtension === ".mp3") {
          questionsArray.push(filePath);
        }
      });
      return questionsArray;
    } catch (error) {
      console.error(error);
    }
  }

  async _createFfmpegCommand() {
    return new Promise(async (resolve, reject) => {
      try {
        const commands = [];
        const concatParts = [];
        const audiosPathArray = await this._fetchAudioQuestionsPath(this.userId);
        audiosPathArray.forEach((audioPath) => {
          commands.push(`-i ${audioPath}`);
          commands.push(`-i ${this.countdown}`);
          commands.push(`-i ${this.answer}`);
        });

        for (let i = 0; i < commands.length; i++) {
          concatParts.push(`[${i}:a]`);
        }

        const ffmpegCommand = `ffmpeg ${commands.join(" ")} -filter_complex "${concatParts.join("")}concat=n=${commands.length}:v=0:a=1" ${this.outputAudio}`;

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

  async concatenate() {
    try {
      await this._executeCommand(await this._createFfmpegCommand());
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AudioConcatenator;
