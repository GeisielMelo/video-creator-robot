const path = require("path");
const { exec } = require("child_process");

class VideoCreator {
  constructor(userId, solicitationNumber) {
    this.userId = userId;
    this.solicitationNumber = solicitationNumber;
    this.outputPath = path.resolve(__dirname, `../downloads/${userId}/${solicitationNumber}/video.mp4`);
    this.videoPath = path.resolve(__dirname, `../downloads/${userId}/out.mp4`);
    this.audioPath = path.resolve(__dirname, `../downloads/${userId}/out.mp3`);
  }

  _createFfmpegCommand() {
    return `ffmpeg -i ${this.videoPath} -i ${this.audioPath} -c:v copy -c:a aac -map 0:v -map 1:a ${this.outputPath}`;
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
      await this._executeCommand(this._createFfmpegCommand());
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = VideoCreator;
