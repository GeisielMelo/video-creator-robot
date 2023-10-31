const path = require("path");
const { exec } = require("child_process");

class VideoCreator {
  constructor(userId, solicitationNumber) {
    this.userId = userId;
    this.solicitationNumber = solicitationNumber;
    this.outputPath = path.resolve(__dirname, `../archives/${userId}/output/${solicitationNumber}.mp4`);
    this.videoPath = path.resolve(__dirname, `../archives/${userId}/processing/out.mp4`);
    this.audioPath = path.resolve(__dirname, `../archives/${userId}/processing/out.mp3`);
    this.trackPath = path.resolve(__dirname, `../templates/track.mp3`);
  }

  _createFfmpegCommand() {
    return `ffmpeg -i ${this.videoPath} -i ${this.audioPath} -i ${this.trackPath} -filter_complex "[1:a][2:a]amix=inputs=2[aout]" -map 0:v -map "[aout]" -c:v copy -shortest ${this.outputPath}`;
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
