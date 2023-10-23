const { exec } = require("child_process");
const path = require("path");

class AudioConcatenator {
  constructor(audiosPathArray, userId) {
    this.audiosPathArray = audiosPathArray;
    this.userId = userId;
    this.countdown = path.resolve(__dirname, `../templates/countdown.wav`);
    this.outputAudio = path.resolve(__dirname, `../downloads/${userId}/out.wav`);
  }

  async _createFfmpegCommand() {
    return new Promise((resolve, reject) => {
      try {
        const commands = [];
        const concatParts = [];
        this.audiosPathArray.forEach((audioPath) => {
          commands.push(`-i ${audioPath}`);
          commands.push(`-i ${this.countdown}`);
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
