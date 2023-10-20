const ffmpeg = require("fluent-ffmpeg");

function getAudioDuration(filePath) {
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

module.exports = getAudioDuration;
